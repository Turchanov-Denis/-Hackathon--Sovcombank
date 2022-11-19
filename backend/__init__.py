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
        await session.commit()
