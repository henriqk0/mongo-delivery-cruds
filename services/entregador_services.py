from repositories.entregador_repository import EntregadorRepository

class EntregadorService:

    @staticmethod
    async def criar_entregador(data):
        return await EntregadorRepository.criar(data)

    @staticmethod
    async def listar_entregador():
        return await EntregadorRepository.listar()

    @staticmethod
    async def buscar_entregador(id: str):
        return await EntregadorRepository.buscar_por_id(id)

    @staticmethod
    async def atualizar_entregador(id: str, data):
        return await EntregadorRepository.atualizar(id, data)

    @staticmethod
    async def deletar_entregador(id: str):
        return await EntregadorRepository.deletar(id)
