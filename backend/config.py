from pyliteconf import Config as _Config
from os import getenv


class DatabaseConfig(_Config):
    _dialect = "mysql+asyncmy"

    _user = getenv("DB_USER")
    _password = getenv("DB_PASSWORD")
    _db_url = getenv("DB_URL")

    url = f"{_dialect}://{_user}:{_password}@{_db_url}"


class FastApiConfig(_Config):
    SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
    ALGORITHM = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES = 15
