from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import desc, asc
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.item_model import Item
from app.models.user_model import User
from app.schemas.item_schema import ItemCreate, ItemResponse
from app.services.auth_service import get_current_user

router = APIRouter()


def get_stock_status(quantity):
    if quantity == 0:
        return "Out of Stock"

    if quantity <= 5:
        return "Low Stock"

    return "In Stock"


def format_item_response(item):
    return {
        "id": item.id,
        "name": item.name,
        "category": item.category,
        "quantity": item.quantity,
        "price": item.price,
        "created_at": item.created_at,
        "updated_at": item.updated_at,
        "stock_status": get_stock_status(item.quantity)
    }


@router.get("/items", response_model=list[ItemResponse])
def get_items(
    search: str = Query(default=""),
    category: str = Query(default=""),
    sort_by: str = Query(default="id"),
    order: str = Query(default="ascending"),
    limit: int = Query(default=10),
    offset: int = Query(default=0),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    query = db.query(Item)

    if search:
        query = query.filter(Item.name.ilike(f"%{search}%"))

    if category:
        query = query.filter(Item.category.ilike(f"%{category}%"))

    if sort_by == "price":
        if order == "descending":
            query = query.order_by(desc(Item.price))
        else:
            query = query.order_by(asc(Item.price))

    elif sort_by == "quantity":
        if order == "descending":
            query = query.order_by(desc(Item.quantity))
        else:
            query = query.order_by(asc(Item.quantity))

    else:
        if order == "descending":
            query = query.order_by(desc(Item.id))
        else:
            query = query.order_by(asc(Item.id))

    items = query.offset(offset).limit(limit).all()

    results = []

    for item in items:
        results.append(format_item_response(item))

    return results


@router.get("/items/low-stock", response_model=list[ItemResponse])
def get_low_stock_items(
    threshold: int = Query(default=5),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    items = db.query(Item).filter(
        Item.quantity <= threshold
    ).all()

    results = []

    for item in items:
        results.append(format_item_response(item))

    return results


@router.get("/items/summary/value")
def get_inventory_value(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    items = db.query(Item).all()

    total_value = 0

    for item in items:
        total_value += item.quantity * item.price

    return {
        "total_inventory_value": total_value
    }


@router.get("/items/stats")
def get_inventory_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    items = db.query(Item).all()

    total_items = len(items)
    total_quantity = 0
    total_value = 0
    low_stock_count = 0

    for item in items:
        total_quantity += item.quantity
        total_value += item.quantity * item.price

        if item.quantity <= 5:
            low_stock_count += 1

    average_price = 0

    if total_quantity > 0:
        average_price = total_value / total_quantity

    return {
        "total_products": total_items,
        "total_quantity": total_quantity,
        "total_inventory_value": total_value,
        "average_item_price": round(average_price, 2),
        "low_stock_count": low_stock_count
    }


@router.get("/items/category-summary")
def get_category_summary(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    items = db.query(Item).all()

    summary = {}

    for item in items:
        if item.category in summary:
            summary[item.category] += item.quantity
        else:
            summary[item.category] = item.quantity

    return summary


@router.get("/items/category-value")
def get_category_value(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    items = db.query(Item).all()

    category_values = {}

    for item in items:
        item_value = item.quantity * item.price

        if item.category in category_values:
            category_values[item.category] += item_value
        else:
            category_values[item.category] = item_value

    rounded_values = {}

    for category, value in category_values.items():
        rounded_values[category] = f"{value:.2f}"

    return rounded_values


@router.get("/items/highest-value")
def get_highest_value_item(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    items = db.query(Item).all()

    if not items:
        raise HTTPException(
            status_code=404,
            detail="No items found"
        )

    highest_item = None
    highest_value = 0

    for item in items:
        item_value = item.quantity * item.price

        if item_value > highest_value:
            highest_value = item_value
            highest_item = item

    return {
        "name": highest_item.name,
        "category": highest_item.category,
        "inventory_value": f"{highest_value:.2f}"
    }


@router.get("/items/lowest-stock")
def get_lowest_stock_item(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    items = db.query(Item).all()

    if not items:
        raise HTTPException(
            status_code=404,
            detail="No items found"
        )

    lowest_item = None
    lowest_quantity = None

    for item in items:
        if (
            lowest_quantity is None
            or item.quantity < lowest_quantity
        ):
            lowest_quantity = item.quantity
            lowest_item = item

    return {
        "name": lowest_item.name,
        "category": lowest_item.category,
        "quantity": lowest_item.quantity,
        "stock_status": get_stock_status(lowest_item.quantity)
    }


@router.get("/items/recent")
def get_recent_items(
    limit: int = Query(default=5),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    items = db.query(Item).order_by(
        desc(Item.created_at)
    ).limit(limit).all()

    results = []

    for item in items:
        results.append(format_item_response(item))

    return results


@router.get("/items/{item_id}", response_model=ItemResponse)
def get_item(
    item_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    item = db.query(Item).filter(
        Item.id == item_id
    ).first()

    if not item:
        raise HTTPException(
            status_code=404,
            detail="Item not found"
        )

    return format_item_response(item)


@router.post("/items", response_model=ItemResponse)
def create_item(
    item: ItemCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    new_item = Item(
        name=item.name,
        category=item.category,
        quantity=item.quantity,
        price=item.price
    )

    db.add(new_item)
    db.commit()
    db.refresh(new_item)

    return format_item_response(new_item)


@router.put("/items/{item_id}", response_model=ItemResponse)
def update_item(
    item_id: int,
    item_data: ItemCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    item = db.query(Item).filter(
        Item.id == item_id
    ).first()

    if not item:
        raise HTTPException(
            status_code=404,
            detail="Item not found"
        )

    item.name = item_data.name
    item.category = item_data.category
    item.quantity = item_data.quantity
    item.price = item_data.price

    db.commit()
    db.refresh(item)

    return format_item_response(item)


@router.delete("/items/{item_id}")
def delete_item(
    item_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    item = db.query(Item).filter(
        Item.id == item_id
    ).first()

    if not item:
        raise HTTPException(
            status_code=404,
            detail="Item not found"
        )

    db.delete(item)
    db.commit()

    return {
        "message": "Item deleted successfully"
    }