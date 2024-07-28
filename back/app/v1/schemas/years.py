from pydantic import BaseModel

class YearBase(BaseModel):
    year: str

class Year(YearBase):
    id: int

    class Config:
        orm_mode = True