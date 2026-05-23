from fastapi import FastAPI
from app.database import engine
from app.models.item_model import Item
from app.routes.item_routes import router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.include_router(router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
        "http://localhost:8000,"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Item.metadata.create_all(bind=engine)

@app.get("/")
def home():
    return {
        "message": "Inventory Management System API"
    }
