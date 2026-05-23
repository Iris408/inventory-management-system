from pydantic import BaseModel
from datetime import datetime

class ItemCreate(BaseModel):

    name: str
    category: str
    quantity: int
    price: float

    class Config:
        from_attributes = True

class ItemResponse(BaseModel):

    id: int
    name: str
    category: str
    quantity: int
    price: float
    stock_status: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
