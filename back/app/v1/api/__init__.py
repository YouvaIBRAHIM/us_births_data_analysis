from fastapi import APIRouter
from app.v1.api.births.births_controller import router as birth_router
from app.v1.api.charts.charts_controller import router as chart_router

router = APIRouter(prefix="/v1", tags=["v1"])

router.include_router(birth_router)
router.include_router(chart_router)