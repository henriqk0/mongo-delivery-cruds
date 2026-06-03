import os
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")

client = AsyncIOMotorClient(MONGO_URI)
database = client["bancodelivery"]

def get_entregador_collection():
    return database["entregador"]

def get_cliente_collection():
    return database["cliente"]

def get_restaurante_collection():
    return database["restaurante"]

def get_pedido_collection():
    return database["pedido"]

def get_item_cardapio_collection():
    return database["itemcardapio"]

def get_item_pedido_collection():
    return database["itempedido"]
