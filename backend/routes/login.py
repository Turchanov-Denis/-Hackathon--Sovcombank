from backend.database import get_session, AsyncSession, AsyncSessionLocal
from pydantic import BaseModel, validator, EmailStr
from backend.database.tables.user import User
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.future import select
from backend.model import as_form


router = APIRouter()


@as_form
class LoginUser(BaseModel):
    email: EmailStr
    password: str

    @validator("email")
    def email_check(cls, email):
        if len(email) > 64:
            raise ValueError("Email is very long (> 64 char)")
        return email

    @validator("password")
    def password_check(cls, password):
        if len(password) < 8:
            raise ValueError("Password is very short (< 8 char)")
        elif len(password) > 128:
            raise ValueError("Password is very long (> 128 char)")
        return password


async def get_user(email: EmailStr, password: str):
    async with AsyncSessionLocal() as db_session:
        # Валидация пользователя (на уникальный email)
        query = select(User.email).where(User.email == email, User.password == password)
        find_user = (await db_session.execute(query)).first()
        if find_user:
            raise ValueError("Email is already busy")
        return find_user


@router.post('/login')
async def reg(form: LoginUser = Depends(LoginUser.as_form)):
    try:
        user = await get_user(form.email, form.password)
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
                        "msg": "user not found",
                        "type": "value_error.email"
                    }
                ]
            }
        )

    return user
