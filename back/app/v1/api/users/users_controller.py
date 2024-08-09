from app.v1.api.users.users_service import auth_backend, fastapi_users, current_active_user
from app.v1.schemas.users import UserCreate, UserRead, UserUpdate
from app.v1.models.users import UserTable
from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder

router = APIRouter(prefix="/users", tags=["v1/users"])

router.include_router(
    fastapi_users.get_auth_router(auth_backend), prefix="/auth/jwt", tags=["auth"]
)
router.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),
    prefix="/auth",
    tags=["auth"],
)
router.include_router(
    fastapi_users.get_reset_password_router(),
    prefix="/auth",
    tags=["auth"],
)
router.include_router(
    fastapi_users.get_verify_router(UserRead),
    prefix="/auth",
    tags=["auth"],
)
router.include_router(
    fastapi_users.get_users_router(UserRead, UserUpdate),
    prefix="/users",
    tags=["users"],
)

@router.get("/check")
def protected_route(user: UserTable = Depends(current_active_user)):
    return JSONResponse(content=jsonable_encoder(user), status_code=status.HTTP_200_OK)  
