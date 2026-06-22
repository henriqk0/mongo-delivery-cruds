# Prompt 1 — Schema Verification and CRUD Implementation

## Prompt

The user requested reading the attributes and classes described in the README.md, verifying that all Pydantic schemas match the names listed there, reviewing the existing codebase, and creating all missing controllers, services, and repositories according to the coding standard already in use.

**Requirements:**

- Read the README.md and verify each entity's attributes match the schemas
- Identify all missing pieces in the codebase
- Follow the existing coding conventions (FastAPI, async, static methods, Motor/MongoDB)
- Create all necessary schemas, repositories, services, and controllers
- Register all new routes in main.py
- Verify the application loads correctly

## Response

The codebase had 6 entities documented in README.md (cliente, restaurante, itemcardapio, pedido, itempedido, entregador), but only `entregador` had a full CRUD implementation. Four schema files (`cliente.py`, `pedido.py`, `item_cardapio.py`, `item_pedido.py`) were copy-pasted from `entregador.py` with wrong class names and attributes. One schema (`restaurante.py`) was correct but had no repository, service, or controller. The `entregador` layer was also missing the `atualizar` (PUT) endpoint.

All schemas were rewritten with the correct attributes matching the README. Repositories, services, and controllers were created for each missing entity following the static-method, async pattern. Collection getters were added to `db/mongodb.py`. The existing `entregador` layer was extended with PUT support. All 6 routers were registered in `main.py`, resulting in 30 total endpoints (5 CRUD operations × 6 entities).

**Key decisions:**

- Used `dict()` instead of `model_dump()` to match the existing codebase pattern (Pydantic v2 compatibility)
- Kept the existing `serialize()` helper pattern in controllers rather than using Pydantic's `model_validate`
- Added `atualizar` (PUT) to all entities, not just the missing ones — retrofitted into `entregador` too
- Used the README's PK naming convention (e.g., `idClnt`, `idPed`) for response fields mapped from MongoDB `_id`
- Created a dedicated `EnderecoCliente` model for cliente address (analogous to existing `Endereco` for restaurante)
- Used `item-cardapio` and `item-pedido` as URL prefixes (hyphenated) following FastAPI conventions

**Files affected:**

- `schemas/cliente.py` — rewritten with ClienteCreate, ClienteResponse, EnderecoCliente
- `schemas/pedido.py` — rewritten with PedidoCreate, PedidoResponse
- `schemas/item_cardapio.py` — rewritten with ItemCardapioCreate, ItemCardapioResponse
- `schemas/item_pedido.py` — rewritten with ItemPedidoCreate, ItemPedidoResponse
- `db/mongodb.py` — added 5 collection getter functions
- `repositories/cliente_repository.py` — created
- `repositories/restaurante_repository.py` — created
- `repositories/pedido_repository.py` — created
- `repositories/item_cardapio_repository.py` — created
- `repositories/item_pedido_repository.py` — created
- `repositories/entregador_repository.py` — added `atualizar` method
- `services/cliente_services.py` — created
- `services/restaurante_services.py` — created
- `services/pedido_services.py` — created
- `services/item_cardapio_services.py` — created
- `services/item_pedido_services.py` — created
- `services/entregador_services.py` — added `atualizar_entregador` method
- `controllers/cliente_routes.py` — created
- `controllers/restaurante_routes.py` — created
- `controllers/pedido_routes.py` — created
- `controllers/item_cardapio_routes.py` — created
- `controllers/item_pedido_routes.py` — created
- `controllers/entregador_routes.py` — added PUT endpoint
- `main.py` — registered all 6 routers
