# Prompt 2 — Continue Building Components

## Prompt

Continue building

## Response

Built the remaining CRUD pages following the same pattern established for the Cliente entity:

1. **RestauranteList** — Table displaying name, CNPJ, phone, email with edit/delete actions
2. **RestauranteForm** — Form with fields: razão social, CNPJ, nome fantasia, telefone, e-mail, and full address (tipo logradouro, logradouro, número, complemento, bairro, CEP, cidade, estado)
3. **ItemCardapioList** — Table showing item name, description, price, availability badge (green/red), with edit/delete
4. **ItemCardapioForm** — Form with dropdown to select the restaurant, plus fields for name, description, price, and availability status
5. **PedidoList** — Table with client ID, restaurant ID, date, total value, and status badge (color-coded: yellow=preparando, blue=a caminho, green=entregue)
6. **PedidoForm** — Form with dropdowns for client, restaurant, delivery person (optional), date/time pickers, tax/total, payment method, and status
7. **EntregadorList** — Table with name, CNH, vehicle plate, vehicle type, and phone
8. **EntregadorForm** — Form with fields for name, CNH, vehicle plate, vehicle type (select: moto/bicicleta/carro), and phone

All pages use `lucide-react` icons (`Trash2` for delete, `Edit2` for edit) and consistent Tailwind styling.

**Files created:**
- `frontend/src/pages/RestauranteList.tsx`, `RestauranteForm.tsx`
- `frontend/src/pages/ItemCardapioList.tsx`, `ItemCardapioForm.tsx`
- `frontend/src/pages/PedidoList.tsx`, `PedidoForm.tsx`
- `frontend/src/pages/EntregadorList.tsx`, `EntregadorForm.tsx`
