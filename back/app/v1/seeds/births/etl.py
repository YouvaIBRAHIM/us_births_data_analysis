import glob
import os
import pandas as pd
from tqdm import tqdm
from sqlalchemy.orm import Session
from sqlalchemy import update
from database.connect import SessionLocal
from app.v1.utils.main import get_year_from_string
from app.v1.utils.model import get_or_create
from app.v1.models.years import Year
from app.v1.models.names import Name
from app.v1.models.births import Birth

db = SessionLocal()

def get_last_processed_year(session):
    last_year = session.query(Year).order_by(Year.id.desc()).first()
    return last_year.year if last_year else None


def process_file(filename, session):
    try:
        year_from_filename = get_year_from_string(filename)
        year_data = {'year': year_from_filename}
        year, is_year_created = get_or_create(session=session, model=Year, defaults=year_data, **year_data)

        data = pd.read_csv(filename, names=['name', 'gender', 'births'])
        
        for index, row in tqdm(data.iterrows(), total=len(data), desc=f"Processing {filename}"):
            name_data = {'name': row['name'], 'gender': row['gender']}
            name, is_name_created = get_or_create(session=session, model=Name, defaults=name_data, **name_data)
            
            birth_data = {'name_id': name.id, 'year_id': year.id, 'births': row['births']}
            _, is_birth_created = get_or_create(session=session, model=Birth, defaults=birth_data, **birth_data)
        
        session.commit()
    
    except Exception as e:
        session.rollback()
        print(f"Error processing file {filename}: {e}")

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
    
    for filename in tqdm(files_to_process, desc="Processing files"):
        process_file(filename, db)
    
except Exception as e:
    print(e)
finally:
    db.close()
