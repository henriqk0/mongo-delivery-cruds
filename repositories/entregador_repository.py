from datetime import datetime
from app.db.mongodb import get_entregador_collection
from bson import ObjectId

class EntregadorRepository:

    @staticmethod
    async def criar(data: dict):
        collection = get_entregador_collection()
        result = await collection.insert_one(data)
        data["_id"] = result.inserted_id
        return data

    @staticmethod
    async def listar():
        collection = get_entregador_collection()
        anotacoes = []
        async for doc in collection.find():
            anotacoes.append(doc)
        return anotacoes

    @staticmethod
    async def buscar_por_id(id: str):
        collection = get_entregador_collection()
        return await collection.find_one({"_id": ObjectId(id)})

    @staticmethod
    async def deletar(id: str):
        collection = get_entregador_collection()
        return await collection.delete_one({"_id": ObjectId(id)})
