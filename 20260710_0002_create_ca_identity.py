"""create ca identity tables

Revision ID: 20260710_0002
Revises: 20260708_0001
Create Date: 2026-07-10

Tables created (in FK dependency order):
    1. users           — authentication anchor, no foreign keys
    2. firms           — CA practice entity, no foreign keys
    3. ca_profiles     — professional profile, FK → users (x2)
    4. firm_memberships — join table, FK → ca_profiles + firms

Downgrade drops tables in exact reverse order.
"""

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op
from sqlalchemy.dialects import postgresql

revision: str = "20260710_0002"
down_revision: str | None = "20260708_0001"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    # -------------------------------------------------------------------------
    # 1. users
    # -------------------------------------------------------------------------
    op.create_table(
        "users",
        sa.Column("id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("email", sa.String(length=255), nullable=False),
        sa.Column("hashed_password", sa.String(length=255), nullable=False),
        sa.Column(
            "is_active",
            sa.Boolean(),
            nullable=False,
            server_default=sa.text("true"),
        ),
        sa.Column(
            "is_superuser",
            sa.Boolean(),
            nullable=False,
            server_default=sa.text("false"),
        ),
        sa.Column("last_login_at", sa.DateTime(timezone=True), nullable=True),
        # SoftDeleteMixin
        sa.Column("deleted_at", sa.DateTime(timezone=True), nullable=True),
        # TimestampMixin
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.Column(
            "updated_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("email", name="uq_users_email"),
    )
    op.create_index(op.f("ix_users_email"), "users", ["email"], unique=True)

    # -------------------------------------------------------------------------
    # 2. firms
    # -------------------------------------------------------------------------
    op.create_table(
        "firms",
        sa.Column("id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("firm_name", sa.String(length=255), nullable=False),
        sa.Column("registration_number", sa.String(length=100), nullable=True),
        sa.Column("firm_type", sa.String(length=50), nullable=True),
        sa.Column("gstin", sa.String(length=15), nullable=True),
        sa.Column("pan", sa.String(length=10), nullable=True),
        sa.Column("city", sa.String(length=100), nullable=True),
        sa.Column("state", sa.String(length=100), nullable=True),
        sa.Column("phone", sa.String(length=20), nullable=True),
        sa.Column("email", sa.String(length=255), nullable=True),
        sa.Column("website", sa.String(length=255), nullable=True),
        sa.Column("established_year", sa.SmallInteger(), nullable=True),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.Column(
            "updated_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("registration_number", name="uq_firms_registration_number"),
        sa.UniqueConstraint("gstin", name="uq_firms_gstin"),
        sa.UniqueConstraint("pan", name="uq_firms_pan"),
    )

    # -------------------------------------------------------------------------
    # 3. ca_profiles
    # -------------------------------------------------------------------------
    op.create_table(
        "ca_profiles",
        sa.Column("id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("user_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("full_name", sa.String(length=255), nullable=False),
        sa.Column("membership_number", sa.String(length=50), nullable=True),
        sa.Column("phone", sa.String(length=20), nullable=True),
        sa.Column("designation", sa.String(length=100), nullable=True),
        sa.Column("years_of_experience", sa.SmallInteger(), nullable=True),
        sa.Column("bio", sa.Text(), nullable=True),
        sa.Column("profile_photo_url", sa.String(length=500), nullable=True),
        sa.Column(
            "verification_status",
            sa.String(length=20),
            nullable=False,
            server_default=sa.text("'pending'"),
        ),
        sa.Column("verified_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("verified_by_user_id", postgresql.UUID(as_uuid=True), nullable=True),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.Column(
            "updated_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        # FK: user who owns this profile — RESTRICT prevents deleting a user
        # while a CA profile exists. Deactivate the user instead.
        sa.ForeignKeyConstraint(
            ["user_id"],
            ["users.id"],
            ondelete="RESTRICT",
            name="fk_ca_profiles_user_id",
        ),
        # FK: admin who verified this profile — SET NULL preserves the profile
        # if the verifying admin account is removed.
        sa.ForeignKeyConstraint(
            ["verified_by_user_id"],
            ["users.id"],
            ondelete="SET NULL",
            name="fk_ca_profiles_verified_by_user_id",
        ),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("user_id", name="uq_ca_profiles_user_id"),
        sa.UniqueConstraint("membership_number", name="uq_ca_profiles_membership_number"),
    )
    op.create_index(
        op.f("ix_ca_profiles_user_id"), "ca_profiles", ["user_id"], unique=True
    )
    op.create_index(
        op.f("ix_ca_profiles_membership_number"),
        "ca_profiles",
        ["membership_number"],
        unique=True,
    )

    # -------------------------------------------------------------------------
    # 4. firm_memberships
    # -------------------------------------------------------------------------
    op.create_table(
        "firm_memberships",
        sa.Column("id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("ca_profile_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("firm_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("role", sa.String(length=50), nullable=True),
        sa.Column(
            "is_primary",
            sa.Boolean(),
            nullable=False,
            server_default=sa.text("false"),
        ),
        sa.Column("joined_at", sa.Date(), nullable=True),
        sa.Column("left_at", sa.Date(), nullable=True),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.Column(
            "updated_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        # CASCADE: memberships die when the CA profile or firm is deleted.
        sa.ForeignKeyConstraint(
            ["ca_profile_id"],
            ["ca_profiles.id"],
            ondelete="CASCADE",
            name="fk_firm_memberships_ca_profile_id",
        ),
        sa.ForeignKeyConstraint(
            ["firm_id"],
            ["firms.id"],
            ondelete="CASCADE",
            name="fk_firm_memberships_firm_id",
        ),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint(
            "ca_profile_id",
            "firm_id",
            name="uq_firm_memberships_ca_profile_firm",
        ),
    )
    op.create_index(
        op.f("ix_firm_memberships_ca_profile_id"),
        "firm_memberships",
        ["ca_profile_id"],
    )
    op.create_index(
        op.f("ix_firm_memberships_firm_id"),
        "firm_memberships",
        ["firm_id"],
    )


def downgrade() -> None:
    # Drop in exact reverse dependency order.
    op.drop_index(op.f("ix_firm_memberships_firm_id"), table_name="firm_memberships")
    op.drop_index(
        op.f("ix_firm_memberships_ca_profile_id"), table_name="firm_memberships"
    )
    op.drop_table("firm_memberships")

    op.drop_index(
        op.f("ix_ca_profiles_membership_number"), table_name="ca_profiles"
    )
    op.drop_index(op.f("ix_ca_profiles_user_id"), table_name="ca_profiles")
    op.drop_table("ca_profiles")

    op.drop_table("firms")

    op.drop_index(op.f("ix_users_email"), table_name="users")
    op.drop_table("users")
