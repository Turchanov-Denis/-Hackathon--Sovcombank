from fastapi import APIRouter, Depends, status, HTTPException
from backend.database import AsyncSession, get_session
from backend.database.tables.history import History
from backend.auth import get_current_active_user
from backend.database.tables.user import User
from pydantic import BaseModel, validator
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


class ExchangeMoney(BaseModel):
    type1: MoneyType
    type2: MoneyType
    value: float

    @validator("value")
    def check_value(cls, value):
        if value < 0:
            raise ValueError("Value wasn't < 0")
        return value


@router.post("/exchange")
async def send(exchange_money: ExchangeMoney,
               current_user: User = Depends(get_current_active_user),
               db_session: AsyncSession = Depends(get_session)):

    if getattr(current_user, exchange_money.type1.name) < exchange_money.value:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Low money",
            headers={"WWW-Authenticate": "Bearer"},
        )

    await db_session.execute(update(User)
                             .where(User.email == current_user.email)
                             .values(
        {exchange_money.type1.value: getattr(current_user, exchange_money.type1.name) - exchange_money.value,
         exchange_money.type2.value: getattr(current_user, exchange_money.type2.name) + exchange_money.value}))

    db_session.add(History(user_id=current_user.id, type1=exchange_money.type1.name, value1=-exchange_money.value,
                           type2=exchange_money.type2.name, value2=exchange_money.value))

    await db_session.commit()

    return {"status_code": status.HTTP_200_OK}
