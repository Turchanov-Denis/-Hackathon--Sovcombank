from database import get_session, AsyncSession
from database.tables.user import User, get_user_from_email
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, validator, EmailStr
from auth import create_access_token
from config import FastApiConfig
from datetime import timedelta


router = APIRouter()


class RegistrationUser(BaseModel):
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


async def check_unique_email(email: EmailStr):
    find_user = await get_user_from_email(email)
    if find_user:
        raise ValueError("Email is already busy")


@router.post('/registration')
@router.post('/reg')
async def reg(form: RegistrationUser,
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

    access_token_expires = timedelta(minutes=FastApiConfig.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = await create_access_token(data={"sub": new_user.email}, expires_delta=access_token_expires)

    return {"access_token": access_token, "token_type": "bearer"}
