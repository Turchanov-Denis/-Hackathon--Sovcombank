from fastapi import APIRouter, Depends, HTTPException, status
from database import AsyncSession, get_session
from auth import get_current_active_user
from database.tables.user import User
from sqlalchemy.future import select
from sqlalchemy import and_

router = APIRouter()


@router.get("/verified_users")
async def verified_users(current_user: User = Depends(get_current_active_user),
                         db_session: AsyncSession = Depends(get_session)):
    if current_user.type != 1:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User is not Admin")
    return (await db_session.execute(
        select(User.email, User.is_blocked).where(and_(User.type != 1, User.is_activated)))).all()
