
from sqlalchemy import Column, String
from fastapi_users.db import SQLAlchemyBaseUserTable
from fastapi_users_db_sqlalchemy.access_token import (
    SQLAlchemyBaseAccessTokenTableUUID,
)
from database.base import Base
import fastapi_users_db_sqlalchemy
import uuid



class UserTable(SQLAlchemyBaseUserTable, Base):
    id = Column(fastapi_users_db_sqlalchemy.generics.GUID(), primary_key=True, default=uuid.uuid4)
    email = Column(String)
    first_name = Column(String)
    last_name = Column(String)

    class Config :
        fields = {"hashed_password": {"exclude": True}}

class AccessToken(SQLAlchemyBaseAccessTokenTableUUID, Base):  
    pass