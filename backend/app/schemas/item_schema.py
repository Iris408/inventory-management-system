from datetime import datetime

from pydantic import BaseModel, Field


class ItemCreate(BaseModel):

    name: str = Field(
        min_length=1,
        max_length=100
    )

    sku: str = Field(
        min_length=1,
        max_length=50
    )

    category: str = Field(
        min_length=1,
        max_length=100
    )

    quantity: int = Field(
        ge=0
    )

    min_threshold: int = Field(
        default=5,
        ge=0
    )

    price: float = Field(
        ge=0
    )


class ItemResponse(BaseModel):

    id: int
    name: str
    sku: str
    category: str
    quantity: int
    min_threshold: int
    price: float
    stock_status: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True