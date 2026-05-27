VENV = .venv
PYTHON = $(VENV)/bin/python
PIP = $(VENV)/bin/pip
UVICORN = $(VENV)/bin/uvicorn

.PHONY: venv install run all

venv:
	python3 -m venv $(VENV)

install: venv
	$(PIP) install -r requirements.txt

run:
	$(UVICORN) main:app --reload

all: install
