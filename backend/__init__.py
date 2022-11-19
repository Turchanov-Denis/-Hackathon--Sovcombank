from backend.database import init_database, AsyncSessionLocal
from fastapi.middleware.cors import CORSMiddleware
from backend.database.tables.user import User
from fastapi import FastAPI
from backend import routes

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
    await database.init_database()

    async with AsyncSessionLocal() as session:
        session.add(User(type=1, email="admin@ad.in", password="admin123"))

        session.add(User(email="user@mail.ru", password="user123"))
        session.add(User(is_blocked=True, email="user2@mail.ru", password="user123"))
        session.add(User(is_activated=True, email="user3@mail.ru", password="user123"))

        session.add(User(is_activated=True, is_blocked=True, email="user4@mail.ru", password="user123"))
        await session.commit()
