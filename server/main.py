from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, origins="*")


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
