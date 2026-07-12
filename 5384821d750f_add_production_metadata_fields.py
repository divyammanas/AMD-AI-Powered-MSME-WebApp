"""add_production_metadata_fields

Revision ID: 5384821d750f
Revises: e9f3f9f6c02b
Create Date: 2026-07-13 01:29:11.884814

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '5384821d750f'
down_revision: Union[str, None] = 'e9f3f9f6c02b'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('knowledge_documents', sa.Column('storage_uri', sa.String(length=1024), nullable=True))
    op.add_column('knowledge_documents', sa.Column('display_name', sa.String(length=255), nullable=True))
    op.add_column('knowledge_documents', sa.Column('display_url', sa.String(length=2048), nullable=True))
    op.add_column('knowledge_documents', sa.Column('source_agency', sa.String(length=255), nullable=True))
    op.add_column('knowledge_documents', sa.Column('citation_label', sa.String(length=100), nullable=True))
    op.add_column('knowledge_documents', sa.Column('source_origin', sa.String(length=100), nullable=True))


def downgrade() -> None:
    op.drop_column('knowledge_documents', 'source_origin')
    op.drop_column('knowledge_documents', 'citation_label')
    op.drop_column('knowledge_documents', 'source_agency')
    op.drop_column('knowledge_documents', 'display_url')
    op.drop_column('knowledge_documents', 'display_name')
    op.drop_column('knowledge_documents', 'storage_uri')
