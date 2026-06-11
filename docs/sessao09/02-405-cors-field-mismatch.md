# Prompt 2 — Debug: frontend não lista resultados e backend retorna 405

## Prompts
- "why the frontend dont list the results and, when try create same entity, my backend returns error 405?"

## Ações
- Identificado que o CORS middleware estava ausente no backend FastAPI
- Corrigido: adicionado `CORSMiddleware` em `backend/main.py` permitindo `http://localhost:3000`
- Identificado que o serializer de entregador retornava `"id"` mas o frontend esperava `"idEntrg"`
- Corrigido: alterado serializer em `backend/controllers/entregador_routes.py` para retornar `"idEntrg"`
- Identificado que a rota de item_cardapio usava hífen (`/item-cardapio`) mas o frontend chamava com underscore (`/item_cardapio`)
- Corrigido: alterado prefixo da rota em `backend/controllers/item_cardapio_routes.py` para `"/item_cardapio"`
