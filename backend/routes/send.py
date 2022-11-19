from backend.database.tables.user import User, get_user_from_email
from backend.database import AsyncSession, get_session
from backend.database.tables.history import History
from pydantic import BaseModel, validator, EmailStr
from backend.auth import get_current_active_user
from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy import update
from enum import Enum

router = APIRouter()


class MoneyType(Enum):
    USD: str = "USD"
    RUB: str = "RUB"
    EUR: str = "EUR"
    BTC: str = "BTC"
    ETH: str = "ETH"
    USDT: str = "USDT"
    BCH: str = "BCH"
    LTC: str = "LTC"
    DASH: str = "DASH"
    XRP: str = "XRP"
    DOGE: str = "DOGE"
    TRX: str = "TRX"


class SendMoney(BaseModel):
    email: EmailStr
    type: MoneyType
    value: float

    @validator("value")
    def check_value(cls, value):
        if value < 0:
            raise ValueError("Value wasn't < 0")
        return value


@router.post("/send")
async def send(send_money: SendMoney,
               current_user: User = Depends(get_current_active_user),
               db_session: AsyncSession = Depends(get_session)):
    find_user = await get_user_from_email(send_money.email)
    if not find_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect email",
            headers={"WWW-Authenticate": "Bearer"},
        )

    await db_session.execute(update(User)
                             .where(User.email == current_user.email)
                             .values(
        {send_money.type.value: getattr(current_user, send_money.type.name) - send_money.value}))
    await db_session.execute(update(User)
                             .where(User.email == send_money.email)
                             .values(
        {send_money.type.value: getattr(current_user, send_money.type.name) + send_money.value}))

    db_session.add(History(user_id=current_user.id, type1=send_money.type.name, value1=-send_money.value))
    db_session.add(History(user_id=find_user.id, type1=send_money.type.name, value1=send_money.value))

    await db_session.commit()

    return {"status_code": status.HTTP_200_OK}
