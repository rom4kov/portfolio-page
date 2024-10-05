from flask import Flask, jsonify, request, make_response, redirect, url_for
from flask_cors import CORS
from sqlalchemy.exc import NoResultFound

from extensions import db
from flask_login import (
    LoginManager,
    current_user,
    login_required,
    login_user,
    logout_user,
)
from sqlalchemy.orm import DeclarativeBase
from models import TextContent, User
from werkzeug.security import generate_password_hash, check_password_hash

import os
from dotenv import load_dotenv


app = Flask(__name__)
cors = CORS(app, origins=["http://localhost:5173"], supports_credentials=True)


load_dotenv()

app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get(
    "DB_URI", "sqlite:///portfolio.db"
)
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY")


class Base(DeclarativeBase):
    pass


db.init_app(app)

login_manager = LoginManager()
login_manager.init_app(app)


with app.app_context():
    db.create_all()


@app.route("/", methods=["GET"])
def home():
    return jsonify({"text": ["Roman Kowert"]})


@login_manager.user_loader
def load_user(user_id):
    print(user_id)
    return db.get_or_404(User, user_id)


@app.route("/api/users", methods=["GET"])
def get_users():
    count = db.session.query(User).count()
    return jsonify(users=count, logged_in=current_user.is_authenticated)


@app.route("/api/auth_state", methods=["GET"])
def get_auth_state():
    return jsonify(auth_state=current_user.is_authenticated)


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


@app.before_request
def handle_preflight():
    if request.method == "OPTIONS":
        response = make_response("", 200)
        response.headers["X-Content-Type-Options"] = "*"
        return response


@app.route("/api/login", methods=["OPTIONS", "POST"])
def login():
    if request.method == "POST":
        data = request.get_json()
        user = db.session.execute(
            db.select(User).where(User.email == data["email"])
        ).scalar()
        if user:
            if check_password_hash(user.password, data["password"]):
                login_user(user, remember=True)
                return jsonify(
                    email=user.email, authenticated=current_user.is_authenticated
                )
        return jsonify(user_email="no user found")
    return "", 200


@app.route("/api/logout", methods=["POST"])
@login_required
def logout():
    logout_user()
    return jsonify(is_authenticated=current_user.is_authenticated)


@app.route("/api/create-text", methods=["POST"])
def create_text():
    data = request.get_json()
    print(data)
    new_text = TextContent(
        body=data["body"],  # type: ignore
        page=data["page"],  # type: ignore
    )
    try:
        db.session.add(new_text)
        db.session.commit()
    except Exception as e:
        raise e
    return jsonify(success=True)


@app.route("/api/update-text", methods=["POST"])
def update_text():
    data = request.get_json()
    try:
        text_to_update = db.session.execute(
            db.select(TextContent).where(TextContent.page == data["page"])
        ).scalar_one()
        text_to_update.body = data["body"]
        db.session.commit()
    except NoResultFound as e:
        print(e._message())
        return redirect(url_for("create_text"), code=307)
    return jsonify(success=True)


@app.route("/api/get-texts", methods=["GET"])
def get_texts():
    text_data = db.session.execute(db.select(TextContent)).scalars()
    texts = [text.to_dict() for text in text_data]
    return jsonify(texts=texts)


if __name__ == "__main__":
    app.run(debug=True)
