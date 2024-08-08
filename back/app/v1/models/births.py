from sqlalchemy import Column, Integer, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from database.connect import Base

class Birth(Base):
    __tablename__ = 'births'
    name_id = Column(Integer, ForeignKey('names.id'), primary_key=True)
    year_id = Column(Integer, ForeignKey('years.id'), primary_key=True)
    births = Column(Integer, default=0)

    name = relationship("Name", back_populates="births")
    year = relationship("Year", back_populates="births")

    __table_args__ = (UniqueConstraint('name_id', 'year_id', name='_name_year_uc'),)
