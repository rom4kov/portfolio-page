from __future__ import annotations
from flask_login import UserMixin
from sqlalchemy import JSON, Integer, String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from extensions import db
from typing import List, Optional


class User(db.Model, UserMixin):  # type: ignore[name-defined]
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    email: Mapped[str] = mapped_column(String(255), nullable=False, unique=True)
    password: Mapped[str] = mapped_column(String(255), nullable=False)

    def to_dict(self):
        return {"id": self.id, "email": self.email}


class TextContent(db.Model):  # type: ignore[name-defined]
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    body: Mapped[str] = mapped_column(String(1020), nullable=False)
    page: Mapped[str] = mapped_column(String(255), nullable=False)

    def to_dict(self):
        return {"id": self.id, "body": self.body, "page": self.page}


class Project(db.Model):  # type: ignore[name-defined]
    __tablename__ = "project_table"

    def __init__(self, title, keywords, img_file_path, url, description) -> None:
        self.title = title
        self.keywords = keywords
        self.img_file_path = img_file_path
        self.url = url
        self.description = description

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    title: Mapped[str] = mapped_column(String(255), nullable=False, unique=True)
    keywords: Mapped[list[str]] = mapped_column(JSON, nullable=True, unique=False)
    img_file_path: Mapped[str] = mapped_column(String(255), nullable=True, unique=True)
    url: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str] = mapped_column(String(255), nullable=True, unique=True)
    features: Mapped[List["Feature"]] = relationship(back_populates="project")

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "keywords": self.keywords,
            "img_file_path": self.img_file_path,
            "url": self.url,
            "description": self.description,
            "features": sorted(
                (feature.to_dict() for feature in self.features), key=lambda f: f["id"]
            ),
        }


class Feature(db.Model):  # type: ignore
    def __init__(self, title, img_file_path, description, project_id) -> None:
        self.title = title
        self.img_file_path = img_file_path
        self.description = description
        self.project_id = project_id

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    img_file_path: Mapped[str] = mapped_column(String(255), nullable=True)
    description: Mapped[str] = mapped_column(String(255), nullable=True)
    project: Mapped["Project"] = relationship(back_populates="features")
    project_id: Mapped[int] = mapped_column(ForeignKey("project_table.id"))

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "img_file_path": self.img_file_path,
            "description": self.description,
            "project_id": self.project_id,
        }


class Occupation(db.Model):  # type: ignore[name-defined]
    def __init__(
        self,
        title: Optional[str] = None,
        time_period: Optional[str] = None,
        description: Optional[str] = None,
        occupation_type: Optional[str] = None,
        instructor: Optional[str] = None,
    ) -> None:
        self.title = title
        self.time_period = time_period
        self.description = description
        self.occupation_type = occupation_type
        self.instructor = instructor

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    time_period: Mapped[Optional[str]] = mapped_column(String(255), nullable=False)
    title: Mapped[Optional[str]] = mapped_column(String(255), nullable=False)
    description: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    occupation_type: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    instructor: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)

    def to_dict(self):
        return {
            "id": self.id,
            "time_period": self.time_period,
            "title": self.title,
            "description": self.description,
            "occupation_type": self.occupation_type,
            "instructor": self.instructor,
        }
