from fastapi import APIRouter
from app.v1.api.births.births_controller import router as birth_router

router = APIRouter(prefix="/v1", tags=["v1"])

router.include_router(birth_router)