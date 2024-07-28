from sqlalchemy import Column, Integer, String, CHAR
from database.connect import Base

class Name(Base):
    __tablename__ = "names"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    gender = Column(CHAR)
    