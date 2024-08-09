from app.v1.api.users.users_service import auth_backend, fastapi_users, current_active_user
from app.v1.schemas.users import UserCreate, UserRead, UserUpdate
from fastapi import APIRouter, Depends

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
def protected_route(user: UserRead = Depends(current_active_user)):
    return f"Hello, {user.email}"   
