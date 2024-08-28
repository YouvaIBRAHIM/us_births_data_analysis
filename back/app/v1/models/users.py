
from sqlalchemy import Column, String
from fastapi_users.db import SQLAlchemyBaseUserTable
from fastapi_users_db_sqlalchemy.access_token import (
    SQLAlchemyBaseAccessTokenTableUUID,
)
from database.base import Base
import fastapi_users_db_sqlalchemy
import uuid
from pydantic import BaseModel



class UserTable(SQLAlchemyBaseUserTable, Base):
    id = Column(fastapi_users_db_sqlalchemy.generics.GUID(), primary_key=True, default=uuid.uuid4)
    email = Column(String)
    first_name = Column(String)
    last_name = Column(String)

    class Config :
        fields = {"hashed_password": {"exclude": True}}

class AccessToken(SQLAlchemyBaseAccessTokenTableUUID, Base):  
    pass

class ChangePasswordRequest(BaseModel):
    current_password: str
    new_password: str
    confirm_password: str