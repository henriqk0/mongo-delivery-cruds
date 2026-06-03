VENV = backend/.venv
PYTHON = $(VENV)/bin/python
PIP = $(VENV)/bin/pip
UVICORN = $(VENV)/bin/uvicorn

.PHONY: venv install run frontend-install frontend-start all

venv:
	python3 -m venv $(VENV)

install: venv
	$(PIP) install -r backend/requirements.txt

run:
	$(UVICORN) backend.main:app --reload

frontend-install:
	cd frontend && npm install

frontend-start:
	cd frontend && npm start

all: install frontend-install
