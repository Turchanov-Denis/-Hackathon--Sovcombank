from fastapi import APIRouter, Depends, HTTPException, status
from backend.database import AsyncSession, get_session
from backend.auth import get_current_active_user
from backend.database.tables.user import User
from backend.model import EditUserState
from sqlalchemy.future import select
from sqlalchemy.sql import update

router = APIRouter()


@router.get("/activate_user")
async def user_activate_list(current_user: User = Depends(get_current_active_user),
                             db_session: AsyncSession = Depends(get_session)):
    if current_user.type != 1:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User is not Admin")
    return (await db_session.execute(select(User.email, User.is_activated).where(User.type != 1))).all()


@router.post("/activate_user")
async def user_activate_list(edit_user: EditUserState,
                             current_user: User = Depends(get_current_active_user),
                             db_session: AsyncSession = Depends(get_session), ):
    if current_user.type != 1:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User is not Admin")
    query = update(User).where(User.email == edit_user.email).values(is_activated=edit_user.state)

    await db_session.execute(query)
    await db_session.commit()

    return {"status_code": status.HTTP_200_OK}