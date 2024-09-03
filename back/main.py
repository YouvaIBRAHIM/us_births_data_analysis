import os
from dotenv import load_dotenv

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from app.v1.api import router as router_v1
from fastapi.responses import JSONResponse


load_dotenv()
app = FastAPI()

OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY')

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


@app.exception_handler(HTTPException)
async def auth_exception_handler(request: Request, exc: HTTPException):
    if exc.status_code == 401:
        return JSONResponse(
            status_code=exc.status_code,
            content="UNAUTHORIZED",
        )

    return JSONResponse(
        status_code=exc.status_code,
        content=exc.detail,
    )

app.include_router(router_v1)

