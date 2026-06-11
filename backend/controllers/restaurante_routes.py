from fastapi import APIRouter, HTTPException
from backend.schemas.restaurante import RestauranteCreate
from backend.services.restaurante_services import RestauranteService

router = APIRouter(prefix="/restaurante", tags=["Restaurantes"])


def serialize(doc):
    endereco = doc.get("dscEnderecoRest", {})
    return {
        "_id": str(doc["_id"]),
        "dscRazaoSocialRest": doc["dscRazaoSocialRest"],
        "numCNPJRest": doc["numCNPJRest"],
        "dscNomeFantasiaRest": doc.get("dscNomeFantasiaRest"),
        "numTelefoneRest": doc.get("numTelefoneRest"),
        "dscEmailRest": doc.get("dscEmailRest"),
        "dscEnderecoRest": {
            "dscTipoLogradouroRest": endereco.get("dscTipoLogradouroRest"),
            "nomLogradouroRest": endereco["nomLogradouroRest"],
            "numLogradouroRest": endereco.get("numLogradouroRest"),
            "dscComplementoRest": endereco.get("dscComplementoRest"),
            "dscBairroRest": endereco.get("dscBairroRest"),
            "numCepRest": endereco.get("numCepRest"),
            "dscCidadeRest": endereco.get("dscCidadeRest"),
            "dscEstadoRest": endereco.get("dscEstadoRest"),
        },
    }


@router.post("/")
async def criar(restaurante: RestauranteCreate):
    result = await RestauranteService.criar_restaurante(restaurante.dict())
    return serialize(result)


@router.get("/")
async def listar():
    restaurantes = await RestauranteService.listar_restaurantes()
    return [serialize(r) for r in restaurantes]


@router.get("/{id}")
async def buscar(id: str):
    restaurante = await RestauranteService.buscar_restaurante(id)
    if not restaurante:
        raise HTTPException(status_code=404, detail="Restaurante não encontrado")
    return serialize(restaurante)


@router.put("/{id}")
async def atualizar(id: str, restaurante: RestauranteCreate):
    result = await RestauranteService.atualizar_restaurante(id, restaurante.dict())
    if not result:
        raise HTTPException(status_code=404, detail="Restaurante não encontrado")
    return serialize(result)


@router.delete("/{id}")
async def deletar(id: str):
    result = await RestauranteService.deletar_restaurante(id)
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Restaurante não encontrado")
    return {"msg": "Deletado com sucesso"}
