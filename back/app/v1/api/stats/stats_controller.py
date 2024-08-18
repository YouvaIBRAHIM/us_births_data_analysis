from app.v1.api.stats.stats_errors import StatsNotFound
from app.v1.models.stats import Stats
from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.v1.api.stats.stats_service import StatsService
from database.connect import get_async_session
from fastapi.responses import JSONResponse

router = APIRouter(prefix="/stats", tags=["v1/stats"])

@router.post("/stats")
async def get_stats(
    request: Stats,
    db: AsyncSession = Depends(get_async_session)
):
    try:
        stats = await StatsService.get_dataframe(
            db,
            years= request.years,
            names= request.names,
            gender= request.gender,
            births_value= request.births_value,
            births_condition= request.births_condition
        )
        json_data = stats.to_dict(orient="records")
        return JSONResponse(content=json_data, status_code=status.HTTP_200_OK)
    except StatsNotFound as e:
        return JSONResponse(content=e.message, status_code=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return JSONResponse(content="INTERNAL_SERVER_ERROR", status_code=status.HTTP_400_BAD_REQUEST)
