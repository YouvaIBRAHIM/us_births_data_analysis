
from sqlalchemy import Column, String, Integer
from fastapi_users.db import SQLAlchemyBaseUserTable
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class UserTable(Base, SQLAlchemyBaseUserTable):
    id = Column(Integer, primary_key=True)
    email = Column(String)
    first_name = Column(String)
    last_name = Column(String)