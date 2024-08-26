from flask import Flask, jsonify
from flask_cors import CORS

from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase


app = Flask(__name__)
cors = CORS(app, origins="*")

class Base(DeclarativeBase):
    pass

login_manager = LoginManager()

db: SQLAlchemy = SQLAlchemy(model_class=Base)


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
