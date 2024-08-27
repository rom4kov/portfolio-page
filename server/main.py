from flask import Flask, jsonify
from flask_cors import CORS

from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase

import os
from dotenv import load_dotenv


app = Flask(__name__)
cors = CORS(app, origins="*")


load_dotenv()

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DB_URI', 'sqlite:///portfolio.db')
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')


class Base(DeclarativeBase):
    pass

login_manager = LoginManager()

db: SQLAlchemy = SQLAlchemy(model_class=Base)

db.init_app(app)

login_manager.init_app(app)

with app.app_context():
    db.create_all()


@app.route("/", methods=["GET"])
def home():
    return jsonify({"text": ["Roman Kowert"]})


@app.route("/api/users", methods=["GET"])
def users():
    return jsonify(
        {
            "users": [
                "roman",
                "rosa",
                "karl",
            ]
        }
    )


if __name__ == "__main__":
    app.run(debug=True)
