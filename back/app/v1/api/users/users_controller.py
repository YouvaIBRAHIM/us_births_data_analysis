from app.v1.api.users.users_service import auth_backend, fastapi_users, current_active_user, password_hash
from app.v1.schemas.users import UserCreate, UserRead, UserUpdate
from app.v1.models.users import UserTable, ChangePasswordRequest
from app.v1.api.users.users_errors import IncorrecPasswordError, InternalServerError, PasswordMismatchError, UserNotFound
from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from database.connect import get_async_session
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi_users.password import PasswordHelper

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

@router.delete("/me")
async def delete_own_user(
    user: UserTable = Depends(current_active_user),
    session: AsyncSession = Depends(get_async_session)
):
    try:
        db_user = await session.get(UserTable, user.id)
        
        if not db_user:
            raise UserNotFound()

        await session.delete(db_user)
        await session.commit()
        return JSONResponse(content={"detail": f"User {user.id} deleted successfully"}, status_code=status.HTTP_200_OK)
    
    except UserNotFound as e:
        return JSONResponse(content={"detail": e.message}, status_code=status.HTTP_404_NOT_FOUND)
    
    except Exception as e:
        raise InternalServerError()
    

@router.post("/change-password")
async def change_password(
    change_password_data: ChangePasswordRequest,
    user: UserTable = Depends(current_active_user),
    session: AsyncSession = Depends(get_async_session),
):
    password_helper = PasswordHelper()
    try:
        is_valid_password = password_helper.verify_and_update(user.hashed_password, password_hash(change_password_data.current_password))
        if not is_valid_password:
            raise IncorrecPasswordError()

        if change_password_data.new_password != change_password_data.confirm_password:
            raise PasswordMismatchError()
        
        hashed_new_password = password_hash(
            change_password_data.new_password
        )

        user.hashed_password = hashed_new_password
        session.add(user)
        await session.commit()

        return JSONResponse(content={"detail": f"User {user.id} password changed successfully"}, status_code=status.HTTP_200_OK)

    except Exception as e:
        return JSONResponse(content={"detail": str(e)}, status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)    
