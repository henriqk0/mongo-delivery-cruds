# Prompt 6 — Correção da versão do react-scripts

## Prompts
- Erro ao executar `make frontend-start`: `react-scripts: command not found`

## Ações
- Identificado que `react-scripts` estava com versão `^0.0.0` (inválida) no `package.json`
- Corrigido para `"5.0.1"`
- Reinstaladas dependências com `npm install` (1207 pacotes)
