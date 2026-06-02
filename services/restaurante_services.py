from repositories.restaurante_repository import RestauranteRepository

class RestauranteService:

    @staticmethod
    async def criar_restaurante(data):
        return await RestauranteRepository.criar(data)

    @staticmethod
    async def listar_restaurantes():
        return await RestauranteRepository.listar()

    @staticmethod
    async def buscar_restaurante(id: str):
        return await RestauranteRepository.buscar_por_id(id)

    @staticmethod
    async def atualizar_restaurante(id: str, data):
        return await RestauranteRepository.atualizar(id, data)

    @staticmethod
    async def deletar_restaurante(id: str):
        return await RestauranteRepository.deletar(id)
