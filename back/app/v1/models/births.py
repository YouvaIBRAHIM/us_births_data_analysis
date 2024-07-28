from sqlalchemy import Column, Integer, ForeignKey
from database.connect import Base

class Birth(Base):
    __tablename__ = 'births'
    name_id = Column(Integer, ForeignKey('names.id'), primary_key=True)
    year_id = Column(Integer, ForeignKey('years.id'), primary_key=True)
    births = Column(Integer, default=0)

