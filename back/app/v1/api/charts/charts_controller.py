
from fastapi import APIRouter, status
from fastapi.responses import JSONResponse
from app.v1.api.charts.charts_service import ChartsService
from app.v1.api.charts.charts_errors import NameNotFound

router = APIRouter(prefix="/charts", tags=["v1/birth"])

@router.get("/")
def get_charts():
    try:
        payload = {
            "title": "Mon titre",
            "type": "pie",
            "yAxis": {
                "field": "years",
                "value": [
                    1933,
                    1934
                ],
                "type": "period"
            },
            "xAxis": {
                "field": "births",
                "value": [],
                "type": "all"
            },
            "conditions": [
                {
                    "field": "gender",
                    "condition": "=",
                    "value": "F"
                },
                {
                    "field": "names",
                    "condition": "LIKE",
                    "value": "Mar%"
                }
            ]
        }
        charts = ChartsService.get_charts(payload)
        return JSONResponse(content=charts, status_code=status.HTTP_200_OK)
    except NameNotFound as e:
        return JSONResponse(content=e.message, status_code=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return JSONResponse(content="INTERNAL_SERVER_ERROR", status_code=status.HTTP_400_BAD_REQUEST)
