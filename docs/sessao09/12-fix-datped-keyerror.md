# Prompt 12 — Fix `KeyError: 'datPed'` no serializer de pedido

## Prompts
- "Fix datPed"
- (correção) "you dont put the .md in docs"

## Resumo
O serializer em `backend/controllers/pedido_routes.py` acessava `doc["datPed"]` e outros campos com índice direto (`[]`), causando `KeyError` se o documento do MongoDB não tivesse o campo. Alterado para usar `.get()` com valores padrão (string vazia ou 0.0) em todos os campos, tornando-o resiliente a dados faltantes.
