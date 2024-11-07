from __future__ import annotations
from enum import unique
from flask_login import UserMixin
from sqlalchemy import JSON, Integer, String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql.elements import SQLCoreOperations
from extensions import db
from typing import List, Dict, Any, Optional


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

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    title: Mapped[str] = mapped_column(String(255), nullable=False, unique=True)
    keywords: Mapped[list[str]] = mapped_column(JSON, nullable=True, unique=False)
    img_file_path: Mapped[str] = mapped_column(String(255), nullable=True, unique=True)
    description: Mapped[str] = mapped_column(String(255), nullable=True, unique=True)
    features: Mapped[List["Feature"]] = relationship(back_populates="project")

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "keywords": self.keywords,
            "img_file_path": self.img_file_path,
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
    title: Mapped[str] = mapped_column(String(255), nullable=False, unique=True)
    img_file_path: Mapped[str] = mapped_column(String(255), nullable=True, unique=True)
    description: Mapped[str] = mapped_column(String(255), nullable=True, unique=True)
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
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    title: Mapped[str] = mapped_column(String(255), nullable=False, unique=True)
    description: Mapped[str] = mapped_column(String(255), nullable=True, unique=True)
