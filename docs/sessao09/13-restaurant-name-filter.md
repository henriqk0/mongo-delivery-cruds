# Prompt 13 — Nome do restaurante nos cards e filtro por restaurante

## Prompts
- "In frontend, add restaurant name in each pedido and cardapio card. also add a filter by restaurant in their list screen"

## Resumo
- **PedidoList**: busca restaurantes e clientes na inicialização; exibe nome do restaurante (dscNomeFantasiaRest || dscRazaoSocialRest) e nome do cliente (nomClnt) em cada card; adiciona filtro por restaurante via `<select>`.
- **ItemCardapioList**: busca restaurantes na inicialização; exibe nome do restaurante em cada card; adiciona filtro por restaurante via `<select>`.
- Ambos os componentes usam `useMemo` para mapear `_id` → nome e para filtrar a lista, evitando re-renderizações desnecessárias.
