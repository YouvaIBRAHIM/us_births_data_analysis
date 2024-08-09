from sqlalchemy import Column, Integer, String, CHAR, UniqueConstraint
from sqlalchemy.orm import relationship
from database.base import Base

class Name(Base):
    __tablename__ = "names"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    gender = Column(CHAR)
    
    __table_args__ = (UniqueConstraint('name', 'gender', name='_name_gender_uc'),)

    