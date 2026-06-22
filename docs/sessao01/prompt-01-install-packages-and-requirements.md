# Prompt 1 — Install packages and create requirements.txt

## Prompt

Install all packages necessary to run this code and create a `requirements.txt` after it.

**Requirements:**

- Identify all third-party dependencies used across the Python files.
- Install the required packages in the current Python environment.
- Generate a `requirements.txt` file with the correct packages and versions.

## Response

Inspected all `.py` files across the project (`main.py`, `controllers/`, `db/`, `repositories/`, `schemas/`, `services/`) and identified the following direct dependencies:

- `fastapi` — web framework (imported in `main.py` and `controllers/entregador_routes.py`)
- `pydantic` — data validation (imported in `schemas/entregador.py`)
- `motor` — async MongoDB driver (imported in `db/mongodb.py`)
- `pymongo` — provides `bson.ObjectId` (imported in `repositories/entregador_repository.py`)
- `uvicorn` — ASGI server (needed to run the app)

Installed all packages via `pip install`, then wrote `requirements.txt` with the installed versions pinned.

**Key decisions:**

- Pinned exact versions from `pip freeze` for reproducibility.
- Listed only top-level direct dependencies (transitives are resolved automatically by pip).
- Included `uvicorn` even though it is not explicitly imported, since it is required to serve the FastAPI application.

**Files affected:**

- `requirements.txt` (created)
