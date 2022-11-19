from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, validator, EmailStr
from backend.database.tables.user import get_user
from backend.auth import create_access_token
from backendConfig import FastApiConfig
from datetime import timedelta


router = APIRouter()


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


@router.post('/login')
async def login(form: LoginUser):
    user = await get_user(form.email, form.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token_expires = timedelta(minutes=FastApiConfig.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = await create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )

    return {"access_token": access_token, "token_type": "bearer"}
