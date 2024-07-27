from fastapi import APIRouter
from app.v1.api.names.names_controller import router as name_router

router = APIRouter(prefix="/v1", tags=["v1"])

router.include_router(name_router)