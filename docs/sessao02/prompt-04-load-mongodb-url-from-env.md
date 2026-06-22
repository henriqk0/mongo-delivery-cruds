# Prompt 4 — Loading MongoDB URL from .env

## Prompt

How to load the MongoDB URL and connection from a `.env` file instead of hardcoding it?

**Requirements:**

- Read `MONGO_URI` from a `.env` file.
- Fall back to a sensible default (`mongodb://localhost:27017`) if the environment variable is not set.
- Keep credentials out of version control.

## Response

Added `python-dotenv` to `requirements.txt`, created a `.env` file (already gitignored) with the `MONGO_URI` variable, and updated `db/mongodb.py` to call `load_dotenv()` and read `MONGO_URI` via `os.getenv()`.

**Key decisions:**

- Used `python-dotenv` with `load_dotenv()` for simplicity — no framework-specific config library.
- Default fallback to `mongodb://localhost:27017` for local development without a `.env` file.
- `.env` was already listed in `.gitignore`, so credentials stay out of version control.
- The `requirements.txt` was updated with `python-dotenv==1.1.0` as a new dependency.

**Files affected:**

- `db/mongodb.py`
- `requirements.txt`
- `.env` (created)
