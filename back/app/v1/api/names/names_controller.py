
from fastapi import APIRouter, status
from fastapi.responses import JSONResponse
from app.v1.api.names.names_service import NamesService
from app.v1.api.names.names_errors import NameNotFound, NameNotCreated

router = APIRouter(prefix="/names", tags=["v1/name"])

@router.get("/")
def get_names():
    try:
        names = NamesService.get_names()
        return JSONResponse(content=names, status_code=status.HTTP_200_OK)
    except NameNotFound as e:
        return JSONResponse(content=e.message, status_code=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return JSONResponse(content="INTERNAL_SERVER_ERROR", status_code=status.HTTP_400_BAD_REQUEST)

@router.get("/create")
def create_name():
    try:
        new_name = NamesService.create_name()
        return JSONResponse(content=new_name, status_code=status.HTTP_201_CREATED)
    except NameNotCreated as e:
        return JSONResponse(content=e.message, status_code=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return JSONResponse(content="INTERNAL_SERVER_ERROR", status_code=status.HTTP_400_BAD_REQUEST)

