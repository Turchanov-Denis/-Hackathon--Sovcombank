from sqlalchemy import Column, Integer, ForeignKey, String, Numeric
from sqlalchemy.orm import relationship
from backend.database import Base


class Currency(Base):
    __tablename_ = "currency"

    id = Column(Integer, primary_key=True, autoincrement=False)

    user_id = Column(Integer, ForeignKey('User.id'), nullable=False)
    user = relationship("User", back_populates="currencies")

    type = Column(String(32), primary_key=True, index=True, nullable=False)
    value = Column(Numeric, default=0, nullable=False)
