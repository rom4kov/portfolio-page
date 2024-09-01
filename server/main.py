from flask import Flask, jsonify, request
from flask_cors import CORS

from extensions import db
from flask_login import LoginManager, current_user, login_user
from sqlalchemy.orm import DeclarativeBase
from models import User
from werkzeug.security import generate_password_hash, check_password_hash

import os
from dotenv import load_dotenv


app = Flask(__name__)
cors = CORS(app, origins="*")


load_dotenv()

app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get(
    "DB_URI", "sqlite:///portfolio.db"
)
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY")


class Base(DeclarativeBase):
    pass


login_manager = LoginManager()

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


@app.route("/api/register", methods=["POST"])
def register():
    data = request.get_json()["body"]
    new_user = User(
        email=data["email"],  # type: ignore
        password=generate_password_hash(  # type: ignore
            data["password"], method="pbkdf2", salt_length=8
        ),
    )
    try:
        db.session.add(new_user)
        db.session.commit()
    except Exception as e:
        raise e
    else:
        user = db.session.execute(
            db.select(User).where(User.email == data["email"])
        ).scalar()
        login_user(user)

    print(data["email"])

    return jsonify({"msg": "request send" })


if __name__ == "__main__":
    app.run(debug=True)
