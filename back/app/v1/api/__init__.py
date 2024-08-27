from fastapi import APIRouter
from app.v1.api.births.births_controller import router as birth_router
from app.v1.api.charts.charts_controller import router as chart_router
from app.v1.api.users.users_controller import router as user_router
from app.v1.api.stats.stats_controller import router as stats_router
from app.v1.api.images.images_controller import router as images_router

router = APIRouter(prefix="/v1", tags=["v1"])

router.include_router(birth_router)
router.include_router(chart_router)
router.include_router(user_router)
router.include_router(stats_router)
router.include_router(images_router)

