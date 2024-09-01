from typing import Optional
import os
from app.v1.models.users import UserTable, AccessToken
from dotenv import load_dotenv

from passlib.context import CryptContext
from app.v1.schemas.users import UserRead
from fastapi import Depends, Request
from fastapi_users import BaseUserManager, FastAPIUsers, UUIDIDMixin
from fastapi_users.authentication import (
    AuthenticationBackend,
    BearerTransport,
)
from fastapi_users.authentication.strategy.db import AccessTokenDatabase, DatabaseStrategy

from fastapi_users.db import SQLAlchemyUserDatabase
from database.connect import get_access_token_db, get_user_db
import uuid

load_dotenv()

SECRET = os.environ.get("JWT_SECRET")

class UserManager(UUIDIDMixin, BaseUserManager[UserTable, uuid.UUID]):
    reset_password_token_secret = SECRET
    verification_token_secret = SECRET

    async def on_after_register(self, user: UserTable, request: Optional[Request] = None):
        print(f"User {user.id} has registered.")

    async def on_after_forgot_password(
        self, user: UserTable, token: str, request: Optional[Request] = None
    ):
        print(f"User {user.id} has forgot their password. Reset token: {token}")

    async def on_after_request_verify(
        self, user: UserTable, token: str, request: Optional[Request] = None
    ):
        print(f"Verification requested for user {user.id}. Verification token: {token}")


async def get_user_manager(user_db: SQLAlchemyUserDatabase = Depends(get_user_db)):
    yield UserManager(user_db)


bearer_transport = BearerTransport(tokenUrl="auth/jwt/login")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def password_hash(password: str) -> str:
    return pwd_context.hash(password)

def get_database_strategy(
    access_token_db: AccessTokenDatabase[AccessToken] = Depends(get_access_token_db),
) -> DatabaseStrategy:
    return DatabaseStrategy(access_token_db, lifetime_seconds=3600)


auth_backend = AuthenticationBackend(
    name="jwt",
    transport=bearer_transport,
    get_strategy=get_database_strategy,
)

fastapi_users = FastAPIUsers[UserRead, uuid.UUID](get_user_manager, [auth_backend])

current_active_user = fastapi_users.current_user(active=True)