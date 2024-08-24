from app.v1.api.stats.stats_errors import StatsNotFound
from fastapi import APIRouter, status, Request
from app.v1.api.stats.stats_service import StatsService
from fastapi.responses import JSONResponse

router = APIRouter(prefix="/stats", tags=["v1/stats"])

@router.post("/")
async def get_stats(
    request: Request
):
    try:
        payload = await request.json()
        print(payload)
        stats = await StatsService.get_stats(payload)

        return JSONResponse(content=stats, status_code=status.HTTP_200_OK)
    except StatsNotFound as e:
        return JSONResponse(content=e.message, status_code=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return JSONResponse(content="INTERNAL_SERVER_ERROR", status_code=status.HTTP_400_BAD_REQUEST)
