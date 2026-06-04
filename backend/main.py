import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base
from app.database import engine
from app.models.item_model import Item
from app.models.user_model import User
from app.routes.item_routes import router as item_router
from app.routes.auth_routes import router as auth_router

app = FastAPI()
app.include_router(item_router)
app.include_router(auth_router, prefix='/auth', tags=["Auth"])

cors_origins = os.getenv(
    "CORS_ORIGINS",
    "http://localhost:5173,http://localhost:5174"
).split(",")

cors_origin = [origin.strip() for origin in cors_origins]

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine, checkfirst=True)

@app.get("/")
def home():
    return {
        "message": "Inventory Management System API"
    }
