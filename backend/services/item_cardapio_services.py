from backend.repositories.item_cardapio_repository import ItemCardapioRepository

class ItemCardapioService:

    @staticmethod
    async def criar_item_cardapio(data):
        return await ItemCardapioRepository.criar(data)

    @staticmethod
    async def listar_itens_cardapio():
        return await ItemCardapioRepository.listar()

    @staticmethod
    async def buscar_item_cardapio(id: str):
        return await ItemCardapioRepository.buscar_por_id(id)

    @staticmethod
    async def atualizar_item_cardapio(id: str, data):
        return await ItemCardapioRepository.atualizar(id, data)

    @staticmethod
    async def deletar_item_cardapio(id: str):
        return await ItemCardapioRepository.deletar(id)
