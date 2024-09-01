import glob
import os
import pandas as pd
from tqdm import tqdm
from sqlalchemy.dialects.postgresql import insert
from app.v1.utils.main import get_year_from_string
from app.v1.utils.model import get_or_create
from app.v1.models.years import Year
from app.v1.models.names import Name
from app.v1.models.births import Birth
from database.connect import SessionLocal

db = SessionLocal()

def get_last_processed_year(session):
    last_year = session.query(Year).order_by(Year.id.desc()).first()
    return last_year.year if last_year else None

def process_files(file_list, session, batch_size=1000):
    try:
        all_data = []

        # Lire tous les fichiers et les concaténer dans une seule DataFrame
        for filename in tqdm(file_list, desc="Lecture des fichiers"):
            year_from_filename = get_year_from_string(filename)
            year_data = {'year': year_from_filename}
            year, is_year_created = get_or_create(session=session, model=Year, defaults=year_data, **year_data)

            data = pd.read_csv(filename, names=['name', 'gender', 'births'])
            data['year_id'] = year.id
            all_data.append(data)

        # Concaténer toutes les données en une seule DataFrame
        all_data_df = pd.concat(all_data, ignore_index=True)

        unique_names = all_data_df[['name', 'gender']].drop_duplicates().reset_index(drop=True)

        existing_names = session.query(Name).filter(
            Name.name.in_(unique_names['name'].tolist()),
            Name.gender.in_(unique_names['gender'].tolist())
        ).all()

        # Créer un dictionnaire pour mapper (name, gender) -> id
        existing_names_dict = {(name.name, name.gender): name.id for name in existing_names}

        new_names = []
        for _, row in tqdm(unique_names.iterrows(), total=len(unique_names), desc="Vérification des nouveaux prénoms"):
            if (row['name'], row['gender']) not in existing_names_dict:
                new_name = Name(name=row['name'], gender=row['gender'])
                new_names.append(new_name)

        if new_names:
            session.bulk_save_objects(new_names)
            session.commit()

        # Récupérer les IDs des prénoms correctement
        names = session.query(Name).all()
        names_map = {(name.name, name.gender): name.id for name in tqdm(names, total=len(names), desc="Récupération des tous les prénoms")}
        all_data_df['name_id'] = all_data_df.apply(lambda row: names_map.get((row['name'], row['gender'])), axis=1)

        # Préparer les données pour la table Births
        births_data = all_data_df[['name_id', 'year_id', 'births']]

        print(births_data.head())

        print(f"Nombre de ligne à insérer dans la table births : {len(births_data)}")

        row_count = 0
        for start in tqdm(range(0, len(births_data), batch_size), desc="Insertions des naissances"):
            batch = births_data.iloc[start:start + batch_size]
            insert_stmt = insert(Birth).values(batch.to_dict(orient='records'))
            upsert_stmt = insert_stmt.on_conflict_do_nothing(
                index_elements=['name_id', 'year_id']
            )
            result = session.execute(upsert_stmt)
            row_count += result.rowcount

            session.flush()

        print(f"Nombre de ligne à insérées dans la table births : {row_count}")

        session.commit()

    except Exception as e:
        print(f"Error : {e}")
        session.rollback()
    finally:
        session.close()

try:
    dirname = os.path.dirname(__file__)
    os.chdir(dirname + "/data")

    files = glob.glob("*.txt")
    print("Fichiers trouvés : ", len(files))
    
    last_year = get_last_processed_year(db)
    files_to_process = []

    for filename in files:
        year_from_filename = get_year_from_string(filename)
        if last_year is None or int(year_from_filename) >= int(last_year):
            files_to_process.append(filename)

    # Traitement des fichiers
    process_files(files_to_process, db)
    
except Exception as e:
    print(e)
finally:
    db.close()
