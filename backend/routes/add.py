from backend.database import AsyncSession, get_session
from backend.auth import get_current_active_user
from fastapi import APIRouter, Depends, status
from backend.database.tables.user import User
from pydantic import BaseModel
from pydantic import validator
from enum import Enum

router = APIRouter()


class MoneyType(Enum):
    USD: str
    RUB: str
    EUR: str
    BTC: str
    ETH: str
    USDT: str
    BCH: str
    LTC: str
    DASH: str
    XRP: str
    DOGE: str
    TRX: str


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
              db_session: AsyncSession = Depends(get_session), ):
    current_user.__setattr__(add_money.type, current_user.__getattribute__(add_money.type) + add_money.value)
    await db_session.commit()

    return {"status_code": status.HTTP_200_OK}
