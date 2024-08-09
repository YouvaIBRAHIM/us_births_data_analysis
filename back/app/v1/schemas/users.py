from fastapi_users import schemas
import uuid


class UserRead(schemas.BaseUser[uuid.UUID]):
    id: uuid.UUID
    email: str
    first_name: str
    last_name: str

    class Config:
        orm_mode = True
        exclude = {"hashed_password"}

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