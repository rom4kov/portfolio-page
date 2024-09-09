from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    pass


login_manager = LoginManager()
db: SQLAlchemy = SQLAlchemy(model_class=Base)

