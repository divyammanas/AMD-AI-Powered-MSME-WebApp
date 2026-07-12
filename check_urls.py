import asyncio
from sqlalchemy import select
from app.db.session import AsyncSessionLocal
from app.models.knowledge import KnowledgeDocument

async def check_urls():
    async with AsyncSessionLocal() as session:
        result = await session.execute(select(KnowledgeDocument).limit(5))
        docs = result.scalars().all()
        for doc in docs:
            print(f"Doc {doc.id} - Source URL: {doc.source_url} - Title: {doc.title}")

asyncio.run(check_urls())
