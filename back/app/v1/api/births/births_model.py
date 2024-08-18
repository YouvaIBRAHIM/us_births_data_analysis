from app.v1.models.births import Birth
from app.v1.api.births.births_errors import NameNotFound
from database.connect import SessionLocal

db = SessionLocal()

class BirthsModel():

    def get_births():
        try:
            return db.query(Birth).limit(5).all()
        except:
            raise NameNotFound()

