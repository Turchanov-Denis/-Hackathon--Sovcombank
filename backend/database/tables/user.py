from sqlalchemy import Column, Integer, String, DateTime, Boolean
from backend.database import Base, AsyncSessionLocal
from sqlalchemy.future import select
# from sqlalchemy.orm import relationship
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
    # currencies = relationship("Currency",
    #                           back_populates="user",
    #                           cascade="all, delete",
    #                           passive_deletes=True)

    create_date = Column(DateTime, default=datetime.utcnow)
    last_update = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    is_activated = Column(Boolean, default=False, nullable=False, index=True)
    is_blocked = Column(Boolean, default=False, nullable=False, index=True)


async def get_user(email: str, password: str) -> User | None:
    async with AsyncSessionLocal() as db_session:
        query = select(User.email).where(User.email == email, User.password == password)
        find_user = (await db_session.execute(query)).first()
    return find_user


async def get_user_from_email(email: str) -> User | None:
    async with AsyncSessionLocal() as db_session:
        query = select(User.email).where(User.email == email)
        find_user = (await db_session.execute(query)).first()
    return find_user
