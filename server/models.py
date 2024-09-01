from __future__ import annotations
from flask_login import UserMixin
from sqlalchemy import Integer, String, Table, Column
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.sql.elements import SQLCoreOperations
from extensions import db
from typing import List, Dict, Any, Optional


class User(db.Model, UserMixin): # type: ignore[name-defined]
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    email: Mapped[str] = mapped_column(String(255), nullable=False, unique=True)
    password: Mapped[str] = mapped_column(String(255), nullable=False)


class Project(db.Model): # type: ignore[name-defined]
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    title: Mapped[str] = mapped_column(String(255), nullable=False, unique=True)
    description: Mapped[str] = mapped_column(String(255), nullable=True, unique=True)


class Occupation(db.Model): # type: ignore[name-defined]
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    title: Mapped[str] = mapped_column(String(255), nullable=False, unique=True)
    description: Mapped[str] = mapped_column(String(255), nullable=True, unique=True)

