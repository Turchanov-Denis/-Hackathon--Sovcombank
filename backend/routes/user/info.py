from auth import get_current_active_user
from database.tables.user import User
from fastapi import APIRouter, Depends

router = APIRouter()


@router.get('/info')
async def user_info(current_user: User = Depends(get_current_active_user)):
    return current_user
