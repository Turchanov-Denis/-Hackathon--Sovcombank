from sqlalchemy import Column, Integer, String, DateTime
# from sqlalchemy.orm import relationship
from backend.database import Base
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
