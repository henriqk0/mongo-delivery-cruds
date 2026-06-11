# Prompt 5 — Substituição de axios por fetch nativo

## Prompts
- "remove axios and use fetch api instead"

## Ações
- Removido `axios` das dependências em `package.json`
- Reescrevido `frontend/src/services/api.ts` usando `fetch` nativo com helper `request()` que emula a interface `{ data }` do axios
- Removidos 24 pacotes obsoletos
