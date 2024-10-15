from __future__ import annotations
from enum import unique
from flask_login import UserMixin
from sqlalchemy import Integer, String, Table, Column, null
from sqlalchemy.orm import Mapped, mapped_column
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
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    project_id: Mapped[int] = mapped_column(Integer, nullable=False, unique=True)
    title: Mapped[str] = mapped_column(String(255), nullable=False, unique=True)
    description: Mapped[str] = mapped_column(String(255), nullable=True, unique=True)

    def to_dict(self):
        return {"project_id": self.project_id, "title": self.title, "description": self.description}


class Occupation(db.Model):  # type: ignore[name-defined]
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    title: Mapped[str] = mapped_column(String(255), nullable=False, unique=True)
    description: Mapped[str] = mapped_column(String(255), nullable=True, unique=True)
