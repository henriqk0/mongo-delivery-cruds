from motor.motor_asyncio import AsyncIOMotorClient

MONGO_URI = "mongodb+srv://user:password@cluster.mongodb.net"

client = AsyncIOMotorClient(MONGO_URI)
database = client["bancodelivery"]

def get_entregador_collection():
    return database["entregador"]
