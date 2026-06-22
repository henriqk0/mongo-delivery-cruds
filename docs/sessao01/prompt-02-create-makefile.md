# Prompt 2 — Create Makefile with venv, install, and run commands

## Prompt

Create a Makefile with commands to create a virtual environment, install dependencies, and run the FastAPI application locally.

**Requirements:**

- Provide a `venv` target to create a Python virtual environment.
- Provide an `install` target to install dependencies from `requirements.txt` into the venv.
- Provide a `run` target to start the FastAPI server locally with hot reload.
- Optionally provide a default target.

## Response

Created a `Makefile` at the project root with four targets:

- **`venv`** — creates a `.venv` virtual environment using `python3 -m venv`.
- **`install`** — depends on `venv`, then runs `pip install -r requirements.txt` inside the venv.
- **`run`** — starts `uvicorn main:app --reload` using the venv's Python.
- **`all`** — default target, runs `install`.

Noted that the existing import paths (`app.api.entregador_routes`, etc.) are incompatible with the current directory structure and would need to be addressed before the app can actually run.

**Key decisions:**

- Used `.venv` as the venv directory name (common convention, already in `.gitignore`).
- Referenced binaries inside the venv explicitly (`$(VENV)/bin/python`, etc.) for correctness.
- Made `install` depend on `venv` so a single `make install` sets up everything.
- Used `--reload` flag on uvicorn for development convenience.

**Files affected:**

- `Makefile` (created)
