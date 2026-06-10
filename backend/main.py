import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.controllers.entregador_routes import router as entregador_router
from backend.controllers.cliente_routes import router as cliente_router
from backend.controllers.restaurante_routes import router as restaurante_router
from backend.controllers.pedido_routes import router as pedido_router
from backend.controllers.item_cardapio_routes import router as item_cardapio_router
from backend.controllers.item_pedido_routes import router as item_pedido_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("ALLOWED_ORIGIN").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(entregador_router)
app.include_router(cliente_router)
app.include_router(restaurante_router)
app.include_router(pedido_router)
app.include_router(item_cardapio_router)
app.include_router(item_pedido_router)
