# Prompt 11 — Refatoração de PKs, consistência de nomes e formulário de pedido

## Prompts
- "After check the changes that i do inside docs/, and using sessao09/ [...] Remove all idNomeAbreviadoEntidade as primary keys in the README.md and schemas. Instead, the primary key for all will be the _id of the MongoDB entity itself. In Requests and Responses, as well as in the frontend, use the attribute names that are in the README.md. In the frontend, reflect these same names. In the order, do not ask for the total order value, as this value will be calculated. Instead, add a way to add items from the selected restaurant's menu to the order form, so that..."

## Ações
- README.md: substituídas todas as PKs customizadas (`idClnt`, `idRest`, `idItemc`, `idPed`, `idEntrg`, `idItemp`) por `_id`; corrigido `DscTipoVeiculoEntrg` → `dscTipoVeiculoEntrg`; adicionado "(calculado automaticamente)" ao `valTotalPed`
- Schemas do backend: todos os `*Response` passaram a usar `_id`; removido `idRest` de `RestauranteCreate`; removido `valTotalPed` de `PedidoCreate` (agora opcional com default 0)
- Serializers dos controllers: todas as chaves de id (`idClnt`, `idRest`, etc.) substituídas por `_id`
- Frontend (list pages): `ClienteList`, `EntregadorList`, `RestauranteList`, `ItemCardapioList`, `PedidoList` — corrigidos nomes de campo para corresponder ao que o backend retorna (ex: `nomItemc` → `dscNomeItemc`, `vlrItemc` → `valPrecoItemc`, `indStatusPed` → `dscStatusPed`) e `id*` → `_id`
- Frontend (form pages): `ClienteForm`, `ItemCardapioForm`, `PedidoForm` — atualizadas referências de `idClnt`, `idRest`, `idEntrg` para `_id` nos options dos selects
- `PedidoForm`: removido campo `valTotalPed` do formulário; adicionada seção para selecionar itens do cardápio do restaurante escolhido; adicionado cálculo automático do total (soma dos itens × quantidade + taxa de entrega); ao criar pedido, também cria os registros em `item_pedido` via `itensPedidoAPI`
- `api.ts`: adicionado `itensPedidoAPI`
- Build frontend: 0 erros, 0 warnings
