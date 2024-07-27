from pydantic import BaseModel

class NameBase(BaseModel):
    name: str

class Name(NameBase):
    id: int

    class Config:
        orm_mode = True