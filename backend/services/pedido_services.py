from backend.repositories.pedido_repository import PedidoRepository

class PedidoService:

    @staticmethod
    async def criar_pedido(data):
        return await PedidoRepository.criar(data)

    @staticmethod
    async def listar_pedidos():
        return await PedidoRepository.listar()

    @staticmethod
    async def buscar_pedido(id: str):
        return await PedidoRepository.buscar_por_id(id)

    @staticmethod
    async def atualizar_pedido(id: str, data):
        return await PedidoRepository.atualizar(id, data)

    @staticmethod
    async def deletar_pedido(id: str):
        return await PedidoRepository.deletar(id)
