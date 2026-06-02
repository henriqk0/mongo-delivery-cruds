from fastapi import FastAPI
from controllers.entregador_routes import router as entregador_router
from controllers.cliente_routes import router as cliente_router
from controllers.restaurante_routes import router as restaurante_router
from controllers.pedido_routes import router as pedido_router
from controllers.item_cardapio_routes import router as item_cardapio_router
from controllers.item_pedido_routes import router as item_pedido_router

app = FastAPI()

app.include_router(entregador_router)
app.include_router(cliente_router)
app.include_router(restaurante_router)
app.include_router(pedido_router)
app.include_router(item_cardapio_router)
app.include_router(item_pedido_router)
