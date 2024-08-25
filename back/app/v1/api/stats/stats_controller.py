from app.v1.api.stats.stats_errors import StatsNotFound
from fastapi import APIRouter, status, Request, Depends
from app.v1.api.stats.stats_service import StatsService
from fastapi.responses import JSONResponse
from app.v1.api.users.users_service import current_active_user

router = APIRouter(prefix="/stats", tags=["v1/stats"])

@router.post("/")
async def get_stats(
    request: Request,
    user=Depends(current_active_user)
):
    try:
        payload = await request.json()
        stats = await StatsService.get_stats(payload)

        if stats == None:
            raise StatsNotFound()
        
        return JSONResponse(content=stats, status_code=status.HTTP_200_OK)
    except StatsNotFound as e:
        return JSONResponse(content=e.message, status_code=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return JSONResponse(content="INTERNAL_SERVER_ERROR", status_code=status.HTTP_400_BAD_REQUEST)
