from datetime import datetime

from sqlalchemy import Column, DateTime, Integer, String, Text

from app.database import Base


class Supplier(Base):

    __tablename__ = "suppliers"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    name = Column(
        String(150),
        nullable=False,
        index=True
    )

    contact_name = Column(
        String(100),
        nullable=True
    )

    email = Column(
        String(150),
        nullable=True
    )

    phone = Column(
        String(50),
        nullable=True
    )

    website = Column(
        String(255),
        nullable=True
    )

    category = Column(
        String(100),
        nullable=False
    )

    status = Column(
        String(50),
        nullable=False,
        default="Active"
    )

    notes = Column(
        Text,
        nullable=True
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False
    )

    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False
    )