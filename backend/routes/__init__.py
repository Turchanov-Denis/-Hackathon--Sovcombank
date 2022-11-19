from . import login, registration, verified_users, inactive_users, ban, activate, add
from .user import info

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from fastapi import FastAPI


def load_routes(app: 'FastAPI'):
    app.include_router(registration.router)
    app.include_router(login.router)

    app.include_router(verified_users.router)
    app.include_router(ban.router)
    app.include_router(inactive_users.router)
    app.include_router(activate.router)

    app.include_router(add.router)

    app.include_router(info.router, prefix="/user")
