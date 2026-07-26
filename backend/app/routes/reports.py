import csv
import io

from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.item_model import Item


router = APIRouter(
    prefix="/reports",
    tags=["Reports"],
)


def get_stock_status(quantity: int) -> str:
    """Return a reporting label based on the current quantity."""

    if quantity == 0:
        return "Out of Stock"

    if quantity <= 5:
        return "Low Stock"

    return "In Stock"


@router.get("/inventory.csv")
def export_inventory_report(
    db: Session = Depends(get_db),
):
    """Export inventory data as a CSV file for Power BI."""

    items = db.query(Item).order_by(Item.id.asc()).all()

    output = io.StringIO()

    fieldnames = [
        "id",
        "name",
        "category",
        "quantity",
        "price",
        "inventory_value",
        "stock_status",
        "created_at",
        "updated_at",
    ]

    writer = csv.DictWriter(
        output,
        fieldnames=fieldnames,
    )

    writer.writeheader()

    for item in items:
        inventory_value = round(item.quantity * item.price, 2)

        writer.writerow(
            {
                "id": item.id,
                "name": item.name,
                "category": item.category,
                "quantity": item.quantity,
                "price": round(item.price, 2),
                "inventory_value": inventory_value,
                "stock_status": get_stock_status(item.quantity),
                "created_at": (
                    item.created_at.isoformat()
                    if item.created_at
                    else ""
                ),
                "updated_at": (
                    item.updated_at.isoformat()
                    if item.updated_at
                    else ""
                ),
            }
        )

    output.seek(0)

    headers = {
        "Content-Disposition": (
            'attachment; filename="inventory_report.csv"'
        )
    }

    return StreamingResponse(
        iter([output.getvalue()]),
        media_type="text/csv",
        headers=headers,
    )