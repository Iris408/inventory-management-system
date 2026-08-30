from app.database import SessionLocal
from app.models.supplier_model import Supplier

DEMO_SUPPLIERS = [
    {
        "name": "Northline Automotive",
        "contact_name": "Daniel Brooks",
        "email": "daniel@northline-demo.example",
        "phone": "+44 20 7946 0101",
        "website": "https://northline-demo.example",
        "category": "Braking",
        "status": "Active",
        "notes": "Primary demo supplier for braking components.",
    },
    {
        "name": "Apex Motion Components",
        "contact_name": "Sarah Chen",
        "email": "sarah@apexmotion-demo.example",
        "phone": "+44 20 7946 0102",
        "website": "https://apexmotion-demo.example",
        "category": "Suspension",
        "status": "Preferred",
        "notes": "Demo supplier for suspension and chassis components.",
    },
    {
        "name": "VoltEdge Automotive",
        "contact_name": "Marcus Reed",
        "email": "marcus@voltedge-demo.example",
        "phone": "+44 20 7946 0103",
        "website": "https://voltedge-demo.example",
        "category": "Electrical",
        "status": "Active",
        "notes": "Demo supplier for electrical and charging components.",
    },
    {
        "name": "Redline Fluid Systems",
        "contact_name": "Emma Clarke",
        "email": "emma@redlinefluid-demo.example",
        "phone": "+44 20 7946 0104",
        "website": "https://redlinefluid-demo.example",
        "category": "Fluids",
        "status": "Active",
        "notes": "Demo supplier for oils, coolants and workshop fluids.",
    },
    {
        "name": "TorqueWorks Distribution",
        "contact_name": "James Patel",
        "email": "james@torqueworks-demo.example",
        "phone": "+44 20 7946 0105",
        "website": "https://torqueworks-demo.example",
        "category": "Drivetrain",
        "status": "Preferred",
        "notes": "Demo supplier for drivetrain and transmission components.",
    },
    {
        "name": "Lumina Vehicle Systems",
        "contact_name": "Sophie Evans",
        "email": "sophie@lumina-demo.example",
        "phone": "+44 20 7946 0106",
        "website": "https://lumina-demo.example",
        "category": "Lighting",
        "status": "Active",
        "notes": "Demo supplier for exterior and interior lighting components.",
    },
]

def seed_suppliers():
    db = SessionLocal()

    try:
        for supplier_data in DEMO_SUPPLIERS:
            existing_supplier = (
                db.query(Supplier)
                .filter(
                    Supplier.name
                    == supplier_data["name"]
                )
                .first()
            )

            if existing_supplier:
                print(
                    f"Skipping existing supplier: "
                    f"{supplier_data['name']}"
                )
                continue

            supplier = Supplier(
                **supplier_data
            )

            db.add(supplier)

            print(
                f"Added supplier: "
                f"{supplier_data['name']}"
            )

        db.commit()

    except Exception:
        db.rollback()
        raise

    finally:
        db.close()


if __name__ == "__main__":
    seed_suppliers()