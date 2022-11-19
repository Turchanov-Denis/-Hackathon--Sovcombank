from backend.auth import get_current_active_user
from backend.database.tables.user import User
from fastapi import APIRouter, Depends
from pydantic import BaseModel
from random import random
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


class getMoney(BaseModel):
    type1: MoneyType
    type2: MoneyType


def get_random(type1: MoneyType, type2: MoneyType):
    price = {
        "BTC": {
            "BTC": 1,
            "RUB": 993441.93,
            "EUR": 16799.64,
            "USD": 16817.94,
        }, "RUB": {
            "BTC": 990687.5,
            "RUB": 1,
            "EUR": 60.68,
            "USD": 59.5,
        }, "EUR": {
            "BTC": 16301,
            "RUB": 60.41,
            "EUR": 1,
            "USD": 1.0194,
        }, "USD": {
            "BTC": 16750,
            "RUB": 59.4,
            "EUR": 1.0164,
            "USD": 1,
        },
    }

    return price[type1.name][type2.name] * (1 + random() / 20)


@router.post("/get")
async def get(get_money: getMoney, _: User = Depends(get_current_active_user)):
    return get_random(get_money.type1, get_money.type2)
