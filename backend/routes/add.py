from backend.database import AsyncSession, get_session
from backend.auth import get_current_active_user
from fastapi import APIRouter, Depends, status
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


class AddMoney(BaseModel):
    type: MoneyType
    value: float

    @validator("value")
    def check_value(cls, value):
        if value < 0:
            raise ValueError("Value wasn't < 0")
        return value


@router.post("/add")
async def add(add_money: AddMoney,
              current_user: User = Depends(get_current_active_user),
              db_session: AsyncSession = Depends(get_session)):
    await db_session.execute(update(User)
                             .where(User.email == current_user.email)
                             .values({add_money.type.value: getattr(current_user, add_money.type.name) + add_money.value}))
    await db_session.commit()

    return {"status_code": status.HTTP_200_OK}
