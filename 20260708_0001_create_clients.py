"""create clients table

Revision ID: 20260708_0001
Revises:
Create Date: 2026-07-08
"""

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op
from sqlalchemy.dialects import postgresql

revision: str = "20260708_0001"
down_revision: str | None = None
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.create_table(
        "clients",
        sa.Column("id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("company_name", sa.String(length=255), nullable=False),
        sa.Column("gst_number", sa.String(length=15), nullable=True),
        sa.Column("pan_number", sa.String(length=10), nullable=True),
        sa.Column("udyam_number", sa.String(length=50), nullable=True),
        sa.Column("sector", sa.String(length=100), nullable=True),
        sa.Column("state", sa.String(length=100), nullable=True),
        sa.Column("turnover", sa.Numeric(14, 2), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_clients_gst_number"), "clients", ["gst_number"], unique=True)
    op.create_index(op.f("ix_clients_pan_number"), "clients", ["pan_number"], unique=True)
    op.create_index(op.f("ix_clients_udyam_number"), "clients", ["udyam_number"], unique=True)


def downgrade() -> None:
    op.drop_index(op.f("ix_clients_udyam_number"), table_name="clients")
    op.drop_index(op.f("ix_clients_pan_number"), table_name="clients")
    op.drop_index(op.f("ix_clients_gst_number"), table_name="clients")
    op.drop_table("clients")
