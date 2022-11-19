from pyliteconf import Config as _Config


class DatabaseConfig(_Config):
    _dialect = "mysql+asyncmy"

    _user = "user"
    _password = "user"
    _db_url = "79.120.76.23:3306/Sovcombank"

    url = f"{_dialect}://{_user}:{_password}@{_db_url}"
