from app.v1.models.names import Name
from app.v1.api.names.names_errors import NameNotFound, NameNotCreated
from database.connect import SessionLocal

from fastapi.encoders import jsonable_encoder


db = SessionLocal()

class NamesModel():

    def get_names():
        try:
            return db.query(Name).all()
        except:
            raise NameNotFound()

    def create_name():
        try:
            name = Name(name='Youva')
            db.add(name)
            db.commit()
            db.refresh(name)
            return name
        except:
            raise NameNotCreated()
