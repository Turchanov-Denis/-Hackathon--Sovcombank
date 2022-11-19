from backend.database import get_session, AsyncSession, AsyncSessionLocal
from pydantic import BaseModel, validator, EmailStr
from backend.database.tables.user import User
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.future import select
from backend.model import as_form

router = APIRouter()


@as_form
class RegistrationUser(BaseModel):
    email: EmailStr
    password: str

    @validator("email")
    def email_check(cls, email):
        if len(email) > 64:
            raise ValueError("Email is very long (> 64 char)")
        return email


async def check_unique_email(email: EmailStr):
    async with AsyncSessionLocal() as db_session:
        # Валидация пользователя (на уникальный email)
        query = select(User.email).where(User.email == email)
        find_user = (await db_session.execute(query)).first()
        if find_user:
            raise ValueError("Email is already busy")


@router.post('/registration')
@router.post('/reg')
async def reg(form: RegistrationUser = Depends(RegistrationUser.as_form),
              db_session: AsyncSession = Depends(get_session)):
    try:
        await check_unique_email(form.email)
    except ValueError:
        return HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail={
                "detail": [
                    {
                        "loc": [
                            "body",
                            "email"
                        ],
                        "msg": "email is already busy",
                        "type": "value_error.email"
                    }
                ]
            }
        )

    new_user = User(**form.dict())
    db_session.add(new_user)
    await db_session.commit()

    return new_user
