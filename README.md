# SubsidyDesk Backend

Basic FastAPI backend for SubsidyDesk.

## Current Step

Step 1 sets up the smallest useful API foundation:

- FastAPI application entrypoint
- Health check endpoint
- Central settings object
- Versioned API router

Step 2 adds the database foundation:

- Async SQLAlchemy engine
- Async database session dependency
- Shared SQLAlchemy base model
- Timestamp mixin
- Alembic migration setup

## Run Locally

```bash
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Then open:

```text
http://127.0.0.1:8000/api/v1/health
```

## Database

The backend is configured for async SQLAlchemy with PostgreSQL.

Set this value in `.env`:

```text
DATABASE_URL=postgresql+asyncpg://postgres:postgres@localhost:5432/subsidydesk
```

Alembic is included for migrations:

```bash
alembic revision --autogenerate -m "initial schema"
alembic upgrade head
```

## Backend Rule

Eligibility logic must stay deterministic. AI can explain and draft, but it must not decide eligibility.

## Clients API

Basic client portfolio endpoints are available under:

```text
/api/v1/clients
```

Supported operations:

- `POST /api/v1/clients`
- `GET /api/v1/clients`
- `GET /api/v1/clients/{client_id}`
- `PATCH /api/v1/clients/{client_id}`
- `DELETE /api/v1/clients/{client_id}`

## Local PostgreSQL With Docker

If Docker Desktop is installed, start PostgreSQL with:

```bash
docker compose up -d
```

Then run migrations:

```bash
.venv\Scripts\python.exe -m alembic upgrade head
```

## Fireworks AI

Fireworks is used only for explanation, drafting, summarization, and chat. It must not decide eligibility.

Add these values to `.env`:

```text
FIREWORKS_API_KEY=your-fireworks-key
FIREWORKS_BASE_URL=https://api.fireworks.ai/inference/v1
FIREWORKS_MODEL=accounts/fireworks/models/deepseek-v3p1
```

The wrapper is in `app/agents/fireworks_provider.py`. Future services should call agents/providers, not the LLM directly from routers.

## If Docker Is Not Available

Use a hosted PostgreSQL database instead of local Docker. Good options are Neon, Supabase, or Railway PostgreSQL.

After creating a hosted database, copy its async SQLAlchemy URL into `.env`:

```text
DATABASE_URL=postgresql+asyncpg://USER:PASSWORD@HOST:5432/DATABASE?ssl=require
```

Then run:

```bash
.venv\Scripts\python.exe -m alembic upgrade head
.venv\Scripts\python.exe -m uvicorn app.main:app --reload
```

For the hackathon, hosted PostgreSQL is acceptable because the final project is still containerized in code with `docker-compose.yml`, while your laptop does not need to run Docker locally.

## Task-Based Fireworks Models

The backend is prepared for this model routing plan:

| Task | Environment variable | Intended model |
| --- | --- | --- |
| AI Chat | `FIREWORKS_CHAT_MODEL` | Kimi K2.6 |
| Eligibility Explanation | `FIREWORKS_EXPLANATION_MODEL` | DeepSeek V4 Pro |
| Application Drafting | `FIREWORKS_DRAFTING_MODEL` | DeepSeek V4 Pro |
| OCR / Document Understanding | `FIREWORKS_OCR_MODEL` | Qwen 3.6 Plus or Qwen VL model |
| Embeddings | `FIREWORKS_EMBEDDING_MODEL` | Qwen3 Embedding 8B |
| Reranking | `FIREWORKS_RERANKER_MODEL` | Qwen3 Reranker 8B |

Use the exact model IDs from your Fireworks dashboard/API access, not just the display names from the recommendation table.

## AI Orchestration Architecture

Business services should call the AI Orchestrator, not Fireworks directly.

```text
Business Services
-> AI Orchestrator
-> Prompt Manager
-> Context Builder
-> Model Registry / Capability Router
-> AI Gateway
-> Fireworks API
```

Current model capabilities are configured centrally in `app/ai/model_registry.py`:

| Capability | Default model |
| --- | --- |
| Reasoning / Chat / Planning / Drafting | `accounts/fireworks/models/gemma-4-31b-it` |
| Document Understanding | `accounts/fireworks/models/qwen3p7-plus` |
| Embedding | `accounts/fireworks/models/qwen3-embedding-8b` |
| Reranking | `accounts/fireworks/models/qwen3-reranker-8b` |

Kimi support remains disabled for the MVP. It can be enabled later with:

```text
KIMI_ENABLED=true
KIMI_CHAT_MODEL=exact-kimi-model-id
```

Eligibility remains deterministic. AI explains deterministic rule outputs only.
