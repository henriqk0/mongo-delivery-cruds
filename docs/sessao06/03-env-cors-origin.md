# Prompt 3 — Variável de ambiente para CORS

## Prompts
- "read a var from .env and, if it doesnt exist, use localhost:3000"
- "read a var from .env and, if it doesnt exist, use localhost:3000 as allowed origin reqs"

## Ações
- Substituído o valor hardcoded `"http://localhost:3000"` no CORS middleware por `os.getenv("ALLOWED_ORIGIN", "http://localhost:3000").split(",")`
- Agora aceita múltiplas origens separadas por vírgula
- Adicionado `import os` em `backend/main.py`
