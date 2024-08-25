
from fastapi import APIRouter, status, Request, Depends
from fastapi.responses import JSONResponse
from app.v1.api.charts.charts_service import ChartsService
from app.v1.api.charts.charts_errors import (
    NameNotFound, InvalidChartType, UnsupportedYAxisField,
    UnsupportedXAxisField, FilterApplicationError, DataProcessingError, 
    DatabaseConnectionError, DataNotFound, DataFrameProcessingError, InvalidConditionFormat
)
from app.v1.api.users.users_service import current_active_user

router = APIRouter(prefix="/charts", tags=["v1/birth"])

@router.post("/")
async def get_charts(
    request: Request,
    user=Depends(current_active_user)
):
    try:
        payload = await request.json()
        charts = ChartsService.get_charts(payload)
        return JSONResponse(content=charts, status_code=status.HTTP_200_OK)
    except (
        NameNotFound, 
        DataNotFound, 
        InvalidChartType, 
        UnsupportedYAxisField,
        UnsupportedXAxisField, 
        FilterApplicationError, 
        DataProcessingError, 
        DataFrameProcessingError, 
        DatabaseConnectionError,
        InvalidConditionFormat
    ) as e:
        return JSONResponse(content=e.message, status_code=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return JSONResponse(content="INTERNAL_SERVER_ERROR", status_code=status.HTTP_400_BAD_REQUEST)
