from database import AsyncSession, get_session
from database.tables.history import History
from auth import get_current_active_user
from database.tables.user import User
from fastapi import APIRouter, Depends
from sqlalchemy.future import select

router = APIRouter()


@router.get("/history")
async def history(current_user: User = Depends(get_current_active_user),
                  db_session: AsyncSession = Depends(get_session)):
    return (await db_session.execute(select(History).where(History.user_id == current_user.id))).all()
