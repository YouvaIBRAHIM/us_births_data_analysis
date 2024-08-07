from fastapi_users import schemas


class UserRead(schemas.BaseUser[int]):
    id: int
    email: str
    first_name: str
    last_name: str

    class Config:
        orm_mode = True

class UserCreate(schemas.BaseUserCreate):
    email: str
    first_name: str
    last_name: str
    password: str

class UserUpdate(schemas.BaseUserUpdate):
    email: str
    first_name: str
    last_name: str
    password: str