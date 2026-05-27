from fastapi import FastAPI
from controllers.entregador_routes import router as entregador_router

app = FastAPI()

app.include_router(entregador_router)
