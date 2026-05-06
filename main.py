from fastapi import FastAPI
from app.api.entregador_routes import router as entregador_router

app = FastAPI()

app.include_router(entregador_router)
