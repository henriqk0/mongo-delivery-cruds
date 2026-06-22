# Prompt 1 — Frontend Analysis and Creation

## Prompt

Analyze the backend code and create a functional frontend based on it.

**Requirements:**
- Technology Stack: React, TypeScript, Tailwind CSS, Lucide Icons
- Design: Mobile-first approach
- Integration and Security: Configure frontend-backend communication through environment variables (.env) to manage origins/URLs on both sides
- Update the root Makefile by adding commands to run the frontend and ensure the integration works
- Return only the necessary file structure and code

## Response

The backend was analyzed (FastAPI with MongoDB, entities: `cliente`, `restaurante`, `item_cardapio`, `pedido`, `entregador`, `item_pedido`). A full React + TypeScript frontend was built with the following structure:

```
frontend/
├── public/index.html
├── src/
│   ├── App.tsx (router + navigation)
│   ├── index.tsx, index.css, App.css
│   ├── services/api.ts (axios instance + per-entity CRUD APIs)
│   ├── types/ (endereco, cliente, restaurante, itemCardapio, pedido, entregador)
│   └── pages/ (HomePage, ClienteList/Form, RestauranteList/Form, ItemCardapioList/Form, PedidoList/Form, EntregadorList/Form)
├── package.json, tsconfig.json, tailwind.config.js, .env
```

**Key decisions:**
- Created a mobile-first responsive layout with Tailwind CSS
- Set `REACT_APP_BACKEND_URL=http://localhost:8000` in `.env` for backend communication
- Created an API service layer (`src/services/api.ts`) abstracting all CRUD operations per entity
- Updated root `Makefile` with `frontend-install` and `frontend-start` targets
- Each entity has a list page and a form page (reused for create/edit)

**Makefile changes:**
```makefile
frontend-install:
	cd frontend && npm install

frontend-start:
	cd frontend && npm start
```

**Files affected:**
- `frontend/package.json`, `frontend/tsconfig.json`, `frontend/.env`
- `frontend/public/index.html`
- `frontend/src/App.tsx`, `frontend/src/index.tsx`, `frontend/src/index.css`
- `frontend/src/services/api.ts`
- `frontend/src/types/` (6 files)
- `frontend/src/pages/` (11 files)
- `Makefile` (updated)
