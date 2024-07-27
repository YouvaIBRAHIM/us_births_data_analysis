import os
from dotenv import load_dotenv

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.v1.api import router as router_v1

from database.connect import engine
from app.v1.models import main as models

load_dotenv()

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

cors_origins_env = os.environ.get('CORS_ORIGINS')
if not cors_origins_env:
    raise ValueError("CORS_ORIGINS var env is not set")

origins = cors_origins_env.split(',')

app.add_middleware(
    CORSMiddleware,
    allow_credentials=False,
    allow_origins=origins,
    allow_methods=['*'],
    allow_headers=['*']
)

app.include_router(router_v1)

