from flask import Flask
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase

# app = Flask(__name__)


class Base(DeclarativeBase):
    pass


login_manager = LoginManager()
db: SQLAlchemy = SQLAlchemy(model_class=Base)

