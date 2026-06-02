from db.mongodb import get_pedido_collection
from bson import ObjectId

class PedidoRepository:

    @staticmethod
    async def criar(data: dict):
        collection = get_pedido_collection()
        result = await collection.insert_one(data)
        data["_id"] = result.inserted_id
        return data

    @staticmethod
    async def listar():
        collection = get_pedido_collection()
        documentos = []
        async for doc in collection.find():
            documentos.append(doc)
        return documentos

    @staticmethod
    async def buscar_por_id(id: str):
        collection = get_pedido_collection()
        return await collection.find_one({"_id": ObjectId(id)})

    @staticmethod
    async def atualizar(id: str, data: dict):
        collection = get_pedido_collection()
        result = await collection.update_one({"_id": ObjectId(id)}, {"$set": data})
        if result.matched_count:
            return await collection.find_one({"_id": ObjectId(id)})
        return None

    @staticmethod
    async def deletar(id: str):
        collection = get_pedido_collection()
        return await collection.delete_one({"_id": ObjectId(id)})
