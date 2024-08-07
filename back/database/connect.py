from typing import AsyncGenerator
from app.v1.models.users import UserTable
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from fastapi import Depends
from fastapi_users.db import SQLAlchemyUserDatabase


load_dotenv()

user = os.environ.get('DB_USER', 'postgres')
password = os.environ.get('DB_PASSWORD', 'postgres')
db = os.environ.get('DB_NAME', 'postgres')
host = os.environ.get('DB_HOST', 'localhost:5432')

SQLALCHEMY_DATABASE_URL = f"postgresql://{user}:{password}@{host}/{db}"
ASYNC_DATABASE_URL = f"postgresql+asyncpg://{user}:{password}@{host}/{db}"


engine = create_engine(
    SQLALCHEMY_DATABASE_URL
)

async_engine = create_async_engine(ASYNC_DATABASE_URL, echo=True)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
async_session_maker = async_sessionmaker(async_engine, expire_on_commit=False)

async def get_async_session() -> AsyncGenerator[AsyncSession, None]:
    async with async_session_maker() as session:
        yield session


async def get_user_db(session: AsyncSession = Depends(get_async_session)):
    yield SQLAlchemyUserDatabase(session, UserTable)

Base = declarative_base()