from flask import Flask, jsonify, request
from flask_cors import CORS

from extensions import db
from flask_login import LoginManager, current_user, login_required, login_user, logout_user
from sqlalchemy.orm import DeclarativeBase
from models import User
from werkzeug.security import generate_password_hash, check_password_hash

import os
import json
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

#
# @app.route("/api/users", methods=["GET"])
# def users():
#     return jsonify(
#         {
#             "users": [
#                 "roman",
#                 "rosa",
#                 "karl",
#             ]
#         }
#     )


@app.route("/api/users", methods=["GET"])
def get_users():
    all_users = db.session.execute(db.select(User).order_by(User.id)).scalars()
    all_users_dict = [user.to_dict() for user in all_users]
    print(all_users_dict)

    return jsonify(users=all_users_dict)


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
    return jsonify(user_email=current_user.email)



@login_manager.user_loader
def load_user(user_id):
    return db.get_or_404(User, user_id)



@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()["body"]
    user = db.session.execute(db.select(User).where(User.email == data["email"])).scalar()
    if user:
        if check_password_hash(user.password, data["password"]):
            login_user(user)
            return jsonify(user_email=user.email)
    return jsonify(user_email="no user found")


@login_required
@app.route("/api/logout", methods=["GET", "POST"])
def logout():
    logout_user()
    return jsonify("user was logged out")


if __name__ == "__main__":
    app.run(debug=True)
