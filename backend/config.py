from pyliteconf import Config as _Config


class DatabaseConfig(_Config):
    _dialect = "mysql+asyncmy"

    _user = "user"
    _password = "user"
    _db_url = "79.120.76.23:3306/Sovcombank"

    url = f"{_dialect}://{_user}:{_password}@{_db_url}"


class FastApiConfig(_Config):
    SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
    ALGORITHM = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES = 15
