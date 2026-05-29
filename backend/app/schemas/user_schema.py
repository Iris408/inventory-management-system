from pydantic import BaseModel
from datetime import datetime

class UserCreate(BaseModel):
    username: str 
    password: str 
    role: str = "User"
    
class UserLogin(BaseModel):
    username: str
    password: str

class UserResponse(BaseModel):
    id: int
    username: str
    role: str
    created_at: datetime    
  
    class Config:
        from_attributes = True
