from fastapi import APIRouter, Depends, HTTPException, status
from database import AsyncSession, get_session
from auth import get_current_active_user
from database.tables.user import User
from model import EditUserState
from sqlalchemy.future import select
from sqlalchemy.sql import update

router = APIRouter()


@router.post("/ban")
async def ban(edit_user: EditUserState,
              current_user: User = Depends(get_current_active_user),
              db_session: AsyncSession = Depends(get_session), ):
    if current_user.type != 1:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User is not Admin")
    query = update(User).where(User.email == edit_user.email).values(is_blocked=edit_user.state)
    await db_session.execute(query)
    await db_session.commit()

    return {"status_code": status.HTTP_200_OK}
