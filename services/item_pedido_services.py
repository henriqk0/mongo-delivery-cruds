from repositories.item_pedido_repository import ItemPedidoRepository

class ItemPedidoService:

    @staticmethod
    async def criar_item_pedido(data):
        return await ItemPedidoRepository.criar(data)

    @staticmethod
    async def listar_itens_pedido():
        return await ItemPedidoRepository.listar()

    @staticmethod
    async def buscar_item_pedido(id: str):
        return await ItemPedidoRepository.buscar_por_id(id)

    @staticmethod
    async def atualizar_item_pedido(id: str, data):
        return await ItemPedidoRepository.atualizar(id, data)

    @staticmethod
    async def deletar_item_pedido(id: str):
        return await ItemPedidoRepository.deletar(id)
