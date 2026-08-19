"""add sku and minimum threshold to items

Revision ID: f2d75926d3b6
Revises: 
Create Date: 2026-08-19 15:43:07.829424

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = 'f2d75926d3b6'
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""

    # 1. Add SKU as nullable first so existing rows remain valid.
    op.add_column(
        "items",
        sa.Column(
            "sku",
            sa.String(),
            nullable=True
        )
    )

    # 2. Add minimum threshold with a temporary database default.
    op.add_column(
        "items",
        sa.Column(
            "min_threshold",
            sa.Integer(),
            server_default="5",
            nullable=False
        )
    )

    # 3. Populate existing inventory rows with unique temporary SKUs.
    op.execute(
        """
        UPDATE items
        SET sku = 'PP-' || LPAD(id::text, 6, '0')
        WHERE sku IS NULL
        """
    )

    # 4. Now that every row has an SKU, make it required.
    op.alter_column(
        "items",
        "sku",
        existing_type=sa.String(),
        nullable=False
    )

    # 5. Add unique SKU index.
    op.create_index(
        "ix_items_sku",
        "items",
        ["sku"],
        unique=True
    )

    # 6. Remove the temporary database default.
    # Python/SQLAlchemy will handle the default for new records.
    op.alter_column(
        "items",
        "min_threshold",
        existing_type=sa.Integer(),
        server_default=None
    )


def downgrade() -> None:
    """Downgrade schema."""

    op.drop_index(
        "ix_items_sku",
        table_name="items"
    )

    op.drop_column(
        "items",
        "min_threshold"
    )

    op.drop_column(
        "items",
        "sku"
    )
    # ### end Alembic commands ###
