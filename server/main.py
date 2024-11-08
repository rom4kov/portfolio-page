from flask import Flask, json, jsonify, request, make_response, redirect, url_for
from flask_cors import CORS
from sqlalchemy.exc import NoResultFound
from sqlalchemy.orm import joinedload

from extensions import db
from flask_login import (
    LoginManager,
    current_user,
    login_required,
    login_user,
    logout_user,
)
from sqlalchemy.orm import DeclarativeBase
from models import User, TextContent, Project, Feature
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename

import os
from dotenv import load_dotenv

UPLOAD_FOLDER = "../roman-kowert/src/assets/images/"
ALLOWED_EXTENSIONS = {"txt", "pdf", "png", "jpg", "jpeg", "gif"}


app = Flask(__name__)
cors = CORS(
    app,
    resources={r"/api/*": {"origins": "http://localhost:5173"}},
    supports_credentials=True,
)

load_dotenv()

app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get(
    "DB_URI", "sqlite:///portfolio.db"
)
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY")
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER


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
        login_user(user, remember=True)
        if user:
            print(user)
            return jsonify(
                email=user.email, authenticated=current_user.is_authenticated
            )
    return "", 200


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
def logout():
    logout_user()
    return jsonify(is_authenticated=current_user.is_authenticated)


@app.route("/api/create-text", methods=["POST"])
def create_text():
    data = request.get_json()
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


@app.route("/api/create-project", methods=["POST"])
def create_project():
    title = request.form.get("title")

    keywords_string = request.form.get("keywords", "")
    keywords = keywords_string.split(",") if keywords_string else []
    keywords = [kw.strip() for kw in keywords]

    description = request.form.get("description")

    file = request.files.get("img_file")
    file_path = None
    if file and isinstance(file.filename, str) and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
        file.save(file_path)

    new_project = Project(
        title=title,  # type: ignore
        keywords=keywords,  # type: ignore
        img_file_path=filename,  # type: ignore
        description=description,  # type: ignore
    )

    try:
        db.session.add(new_project)
        db.session.commit()
        return jsonify(success=True, file_path=file_path)
    except Exception as e:
        db.session.rollback()
        return jsonify(success=False, error=str(e)), 500


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route("/api/get-projects", methods=["GET"])
def get_projects():
    project_data = (
        db.session.execute(db.select(Project).options(joinedload(Project.features)))
        .unique()
        .scalars()
    )
    projects = [project.to_dict() for project in project_data]
    return jsonify(projects=projects)


@app.route("/api/update-project", methods=["POST"])
def update_project():
    id = request.form.get("id")
    title = request.form.get("title")

    keywords_string = request.form.get("keywords", "")
    keywords = keywords_string.split(",") if keywords_string else []
    keywords = [kw.strip() for kw in keywords]

    description = request.form.get("description")

    file = request.files.get("img_file")
    filename = ""
    if (
        file is not None
        and isinstance(file.filename, str)
        and allowed_file(file.filename)
    ):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config["UPLOAD_FOLDER"], filename))

    try:
        project = db.session.execute(
            db.select(Project).where(Project.id == id)
        ).scalar_one()
        project.title = title
        if file is not None and isinstance(filename, str):
            project.img_file_path = filename
        project.keywords = keywords
        project.description = description
        db.session.commit()
        return jsonify(success=True, title=project.title, description=project.description)
    except NoResultFound as e:
        print(e._message())
        return redirect(url_for("create_project"), code=307)


@app.route("/api/delete-project", methods=["POST"])
def delete_project():
    project_id = request.get_json()["id"]
    try:
        project_to_delete = db.session.execute(
            db.select(Project).where(Project.id == project_id)
        ).scalar()
        db.session.delete(project_to_delete)
        db.session.commit()
        return jsonify(success=True)
    except Exception as e:
        return jsonify(success=True, message=e)


@app.route("/api/create-feature", methods=["POST"])
def create_feature():
    project_id = request.form.get("project_id")
    title = request.form.get("title")
    description = request.form.get("description")

    file = request.files.get("img_file")
    print(file)
    filename = ""
    if (
        file is not None
        and isinstance(file.filename, str)
        and allowed_file(file.filename)
    ):
        filename = secure_filename(file.filename)
        print(filename)
        file.save(os.path.join(app.config["UPLOAD_FOLDER"], filename))

    new_feature = Feature(
        title=title,
        description=description,
        img_file_path=filename,
        project_id=project_id,
    )

    try:
        db.session.add(new_feature)
        db.session.commit()
        return jsonify(success=True)
    except Exception as e:
        db.session.rollback()
        return jsonify(success=False, error=str(e)), 500


@app.route("/api/update-feature", methods=["POST"])
def update_feature():
    id = request.form.get("id")
    title = request.form.get("title")
    description = request.form.get("description")

    file = request.files.get("img_file")
    filename = ""
    if (
        file is not None
        and isinstance(file.filename, str)
        and allowed_file(file.filename)
    ):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config["UPLOAD_FOLDER"], filename))

    try:
        feature_to_update = db.session.execute(
            db.select(Feature).where(Feature.id == id)
        ).scalar_one()
        feature_to_update.title = title
        if file is not None and isinstance(filename, str):
            feature_to_update.img_file_path = filename
        feature_to_update.description = description
        db.session.commit()
        return jsonify(success=True)
    except Exception as e:
        db.session.rollback()
        return jsonify(succuss=False, error=str(e)), 500


@app.route("/api/delete-feature", methods=["POST"])
def delete_feature():
    feature_id = request.get_json()["id"]
    try:
        feature_to_delete = db.session.execute(
            db.select(Feature).where(Feature.id == feature_id)
        ).scalar()
        db.session.delete(feature_to_delete)
        db.session.commit()
        return jsonify(success=True)
    except Exception as e:
        return jsonify(success=True, message=e)


if __name__ == "__main__":
    app.run(debug=True)
