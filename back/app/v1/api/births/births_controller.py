
from fastapi import APIRouter, status
from fastapi.responses import JSONResponse
from app.v1.api.births.births_service import BirthsService
from app.v1.api.births.births_errors import NameNotFound

router = APIRouter(prefix="/births", tags=["v1/birth"])

@router.get("/")
def get_births():
    try:
        births = BirthsService.get_births()
        return JSONResponse(content=births, status_code=status.HTTP_200_OK)
    except NameNotFound as e:
        return JSONResponse(content=e.message, status_code=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return JSONResponse(content="INTERNAL_SERVER_ERROR", status_code=status.HTTP_400_BAD_REQUEST)
