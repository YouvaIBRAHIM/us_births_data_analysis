import glob, os
from database.connect import SessionLocal
from app.v1.utils.main import get_year_from_string
from app.v1.utils.model import get_or_create
from app.v1.models.years import Year
from app.v1.models.names import Name
from app.v1.models.births import Birth
db = SessionLocal()

try:
    dirname = os.path.dirname(__file__)
    os.chdir(dirname + "/data")

    files = glob.glob("*.txt")
    print("Fichiers trouvés : ", len(files))
    
    for filename in files:
        year_from_filename = get_year_from_string(filename)
        year_data = {
            'year': year_from_filename
        }
        year, is_year_created = get_or_create(session=db, model=Year, defaults=year_data, **year_data)

        with open(filename, 'r') as fd:
            while line := fd.readline():
                if ',' in line:
                    splitted_line = line.strip().split(',')
                    name_data = {
                        'name': splitted_line[0],
                        'gender': splitted_line[1]
                    }
                    name, is_name_created = get_or_create(session=db, model=Name, defaults=name_data, **name_data)

                    if(is_name_created):
                        birth_data = {
                            'name_id': name.id,
                            'year_id': year.id,
                            'births': int(splitted_line[2])
                        }

                        name, is_birth_created = get_or_create(session=db, model=Birth, defaults=birth_data, **birth_data)
except Exception as e:
    print(e)

                
