from sqlalchemy import Column, Integer, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from backend.database import Base
from datetime import datetime


class History(Base):
    __tablename__ = "history"

    id = Column(Integer, primary_key=True)

    type = Column(Integer, default=0)

    currency_type = Column(Integer, ForeignKey("Currency.id"))
    date = Column(DateTime, )

