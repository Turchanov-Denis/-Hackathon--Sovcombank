import random

from database import init_database, AsyncSessionLocal
from fastapi.middleware.cors import CORSMiddleware
from database.tables.user import User
from fastapi import FastAPI
import routes

app = FastAPI()

origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

routes.load_routes(app)


@app.on_event("startup")
async def startup_event():
    await init_database()

    async with AsyncSessionLocal() as session:
        session.add(User(type=1, email="admin@ad.in", password="adminadmin"))
        session.add(User(type=1, email="admin1@ad.in", password="adminadmin"))
        session.add(User(type=1, email="admin2@ad.in", password="adminadmin"))
        session.add(User(type=1, email="admin3@ad.in", password="adminadmin"))
        session.add(User(type=1, email="admin4@ad.in", password="adminadmin"))
        session.add(User(type=1, email="admin5@ad.in", password="adminadmin"))

        session.add(User(email="user@mail.ru", password="useruser"))
        session.add(User(is_blocked=True, email="user2@mail.ru", password="useruser"))
        session.add(User(is_activated=True, email="user3@mail.ru", password="useruser"))
        session.add(User(is_activated=True, is_blocked=True, email="user4@mail.ru", password="useruser"))

        session.add(User(is_activated=True, is_blocked=False,
                         RUB=random.randrange(100, 1000), email="test@mail.ru", password="testtest"))
        session.add(User(is_activated=True, is_blocked=False,
                         RUB=random.randrange(100, 1000), email="test0@mail.ru", password="testtest"))
        session.add(User(is_activated=True, is_blocked=False,
                         RUB=random.randrange(100, 1000), email="test1@mail.ru", password="testtest"))
        session.add(User(is_activated=True, is_blocked=False,
                         RUB=random.randrange(100, 1000), email="test2@mail.ru", password="testtest"))
        session.add(User(is_activated=True, is_blocked=False,
                         RUB=random.randrange(100, 1000), email="test3@mail.ru", password="testtest"))
        session.add(User(is_activated=True, is_blocked=False,
                         RUB=random.randrange(100, 1000), email="test4@mail.ru", password="testtest"))
        session.add(User(is_activated=True, is_blocked=False,
                         RUB=random.randrange(100, 1000), email="test5@mail.ru", password="testtest"))
        session.add(User(is_activated=True, is_blocked=False,
                         RUB=random.randrange(100, 1000), email="test6@mail.ru", password="testtest"))
        session.add(User(is_activated=True, is_blocked=False,
                         RUB=random.randrange(100, 1000), email="test7@mail.ru", password="testtest"))
        session.add(User(is_activated=True, is_blocked=False,
                         RUB=random.randrange(100, 1000), email="test8@mail.ru", password="testtest"))
        session.add(User(is_activated=True, is_blocked=False,
                         RUB=random.randrange(100, 1000), email="test9@mail.ru", password="testtest"))

        await session.commit()
