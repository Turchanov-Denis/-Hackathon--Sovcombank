from . import login, registration, ban_user, activate_user
from .user import info

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from fastapi import FastAPI


def load_routes(app: 'FastAPI'):
    app.include_router(registration.router)
    app.include_router(login.router)

    app.include_router(ban_user.router)
    app.include_router(activate_user.router)

    app.include_router(info.router, prefix="/user")
