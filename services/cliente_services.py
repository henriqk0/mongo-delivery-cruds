from repositories.cliente_repository import ClienteRepository

class ClienteService:

    @staticmethod
    async def criar_cliente(data):
        return await ClienteRepository.criar(data)

    @staticmethod
    async def listar_clientes():
        return await ClienteRepository.listar()

    @staticmethod
    async def buscar_cliente(id: str):
        return await ClienteRepository.buscar_por_id(id)

    @staticmethod
    async def atualizar_cliente(id: str, data):
        return await ClienteRepository.atualizar(id, data)

    @staticmethod
    async def deletar_cliente(id: str):
        return await ClienteRepository.deletar(id)
