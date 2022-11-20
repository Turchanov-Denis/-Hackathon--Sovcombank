from sqlalchemy import Column, Integer, String, DateTime, Boolean, Float
from database import Base, AsyncSessionLocal
from sqlalchemy.orm import relationship
from sqlalchemy.future import select
from datetime import datetime


class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True, nullable=False)

    # System information
    type = Column(Integer, default=0, nullable=False, index=True)

    # Verification information
    email = Column(String(64), index=True, unique=True)
    phone = Column(Integer, index=True, unique=True)
    password = Column(String(128))

    # Personal information
    name = Column(String(32))
    surname = Column(String(32))

    create_date = Column(DateTime, default=datetime.utcnow)
    last_update = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    is_activated = Column(Boolean, default=False, nullable=False, index=True)
    is_blocked = Column(Boolean, default=False, nullable=False, index=True)

    USD = Column(Float, nullable=False, default=0)
    RUB = Column(Float, nullable=False, default=0)
    EUR = Column(Float, nullable=False, default=0)
    BTC = Column(Float, nullable=False, default=0)
    ETH = Column(Float, nullable=False, default=0)
    USDT = Column(Float, nullable=False, default=0)
    BCH = Column(Float, nullable=False, default=0)
    LTC = Column(Float, nullable=False, default=0)
    DASH = Column(Float, nullable=False, default=0)
    XRP = Column(Float, nullable=False, default=0)
    DOGE = Column(Float, nullable=False, default=0)
    TRX = Column(Float, nullable=False, default=0)

    history = relationship("History", back_populates="user")


async def get_user(email: str, password: str) -> User | None:
    async with AsyncSessionLocal() as db_session:
        query = select(User).where(User.email == email, User.password == password)
        find_user = (await db_session.execute(query)).scalar()
    return find_user


async def get_user_from_email(email: str) -> User | None:
    async with AsyncSessionLocal() as db_session:
        query = select(User).where(User.email == email)
        find_user = (await db_session.execute(query)).scalar()
    return find_user


