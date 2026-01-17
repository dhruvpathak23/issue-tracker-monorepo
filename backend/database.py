from sqlalchemy import create_engine, Column, String, DateTime, Boolean, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime
import os

# Database configuration
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./issues.db")

# Create engine
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {}
)

# Create session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create declarative base
Base = declarative_base()


class UserModel(Base):
    """SQLAlchemy model for User"""
    __tablename__ = "users"

    id = Column(String, primary_key=True, index=True)
    email = Column(String(100), unique=True, index=True, nullable=False)
    username = Column(String(50), unique=True, index=True, nullable=False)
    password = Column(String(255), nullable=False)
    fullName = Column(String(100), nullable=True)
    isActive = Column(Boolean, default=True, index=True)
    createdAt = Column(DateTime, default=datetime.utcnow)
    updatedAt = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    class Config:
        orm_mode = True


class IssueModel(Base):
    """SQLAlchemy model for Issue"""
    __tablename__ = "issues"

    id = Column(String, primary_key=True, index=True)
    userId = Column(String, ForeignKey("users.id"), index=True, nullable=False)
    title = Column(String(200), index=True, nullable=False)
    status = Column(String(20), index=True, default="open")
    priority = Column(String(20), index=True, default="medium")
    assignee = Column(String(100), index=True, nullable=True)
    createdAt = Column(DateTime, default=datetime.utcnow)
    updatedAt = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    class Config:
        orm_mode = True


# Create tables
Base.metadata.create_all(bind=engine)


def get_db():
    """Dependency for getting database session"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

