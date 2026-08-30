from datetime import datetime

from pydantic import BaseModel, Field


class SupplierCreate(BaseModel):

    name: str = Field(
        min_length=1,
        max_length=150
    )

    contact_name: str | None = Field(
        default=None,
        max_length=100
    )

    email: str | None = Field(
        default=None,
        max_length=150
    )

    phone: str | None = Field(
        default=None,
        max_length=50
    )

    website: str | None = Field(
        default=None,
        max_length=255
    )

    category: str = Field(
        min_length=1,
        max_length=100
    )

    status: str = Field(
        default="Active",
        max_length=50
    )

    notes: str | None = None


class SupplierUpdate(BaseModel):

    name: str | None = Field(
        default=None,
        min_length=1,
        max_length=150
    )

    contact_name: str | None = Field(
        default=None,
        max_length=100
    )

    email: str | None = Field(
        default=None,
        max_length=150
    )

    phone: str | None = Field(
        default=None,
        max_length=50
    )

    website: str | None = Field(
        default=None,
        max_length=255
    )

    category: str | None = Field(
        default=None,
        max_length=100
    )

    status: str | None = Field(
        default=None,
        max_length=50
    )

    notes: str | None = None


class SupplierResponse(BaseModel):

    id: int
    name: str
    contact_name: str | None
    email: str | None
    phone: str | None
    website: str | None
    category: str
    status: str
    notes: str | None

    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True