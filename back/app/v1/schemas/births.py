from pydantic import BaseModel
from app.v1.models.names import Name
from app.v1.models.years import Year

class BirthBase(BaseModel):
    births: int

class Birth(BirthBase):
    name_id: int
    year_id: int
    name: Name
    year: Year

    class Config:
        orm_mode: True