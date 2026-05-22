from fastapi import FastAPI
from app.database import engine
from app.models.item_model import Item
from app.routes.item_routes import router

app = FastAPI()
app.include_router(router)

Item.metadata.create_all(bind=engine)

@app.get("/")
def home():
    return {
        "message": "Inventory Management System API"
    }
