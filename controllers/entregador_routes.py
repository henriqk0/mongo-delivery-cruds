from fastapi import APIRouter, HTTPException
from schemas.entregador import EntregadorCreate
from services.entregador_services import EntregadorService

router = APIRouter(prefix="/entregador", tags=["Entregadores"])


def serialize(doc):
    return {
        "id": str(doc["_id"]),
        "nomEntrg": doc["nomEntrg"],
        "numCNHEntrg": doc["numCNHEntrg"],
        "dscPlacaVeiculoEntrg": doc["dscPlacaVeiculoEntrg"],
        "dscTipoVeiculoEntrg": doc["dscTipoVeiculoEntrg"],
        "numTelefoneEntrg": doc["numTelefoneEntrg"],
    }


@router.post("/")
async def criar(entregador: EntregadorCreate):
    result = await EntregadorService.criar_entregador(entregador.dict())
    return serialize(result)


@router.get("/")
async def listar():
    entregadores = await EntregadorService.listar_entregador()
    return [serialize(a) for a in entregadores]


@router.get("/{id}")
async def buscar(id: str):
    entregador = await EntregadorService.buscar_entregador(id)
    if not entregador:
        raise HTTPException(status_code=404, detail="Não encontrada")
    return serialize(entregador)


@router.put("/{id}")
async def atualizar(id: str, entregador: EntregadorCreate):
    result = await EntregadorService.atualizar_entregador(id, entregador.dict())
    if not result:
        raise HTTPException(status_code=404, detail="Não encontrado")
    return serialize(result)


@router.delete("/{id}")
async def deletar(id: str):
    result = await EntregadorService.deletar_entregador(id)
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Não encontrado")
    return {"msg": "Deletado com sucesso"}
