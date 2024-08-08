from sqlalchemy import Column, Integer
from sqlalchemy.orm import relationship
from database.connect import Base

class Year(Base):
    __tablename__ = "years"

    id = Column(Integer, primary_key=True)
    year = Column(Integer)
    
    births = relationship("Birth", back_populates="year")