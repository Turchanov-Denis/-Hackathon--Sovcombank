from sqlalchemy import Column, Integer, String, DateTime, Float, ForeignKey
from sqlalchemy.orm import relationship
from backend.database import Base
from datetime import datetime


class History(Base):
    __tablename__ = "history"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('user.id'), index=True, nullable=False)
    user = relationship("User", back_populates="history")

    type1 = Column(String(8), nullable=False)
    value1 = Column(Float, nullable=False)
    type2 = Column(String(8), nullable=True)
    value2 = Column(Float, nullable=True)

    date = Column(DateTime, default=datetime.utcnow)

