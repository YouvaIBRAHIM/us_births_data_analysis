from app.v1.models.users import User
from app.v1.api.users.users_errors import UserNotFound
from database.connect import SessionLocal

db = SessionLocal()

class UsersModel():

    def get_users():
        try:
            return db.query(User).all()
        except:
            raise UserNotFound()