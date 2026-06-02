from fastapi import APIRouter, HTTPException
from schemas.pedido import PedidoCreate
from services.pedido_services import PedidoService

router = APIRouter(prefix="/pedido", tags=["Pedidos"])


def serialize(doc):
    return {
        "idPed": str(doc["_id"]),
        "idClientePed": doc["idClientePed"],
        "idRestaurantePed": doc["idRestaurantePed"],
        "idEntregadorPed": doc.get("idEntregadorPed"),
        "datPed": doc["datPed"],
        "horPed": doc["horPed"],
        "valTaxaentregaPed": doc["valTaxaentregaPed"],
        "valTotalPed": doc["valTotalPed"],
        "dscFormapagammentoPed": doc["dscFormapagammentoPed"],
        "dscStatusPed": doc["dscStatusPed"],
    }


@router.post("/")
async def criar(pedido: PedidoCreate):
    result = await PedidoService.criar_pedido(pedido.dict())
    return serialize(result)


@router.get("/")
async def listar():
    pedidos = await PedidoService.listar_pedidos()
    return [serialize(p) for p in pedidos]


@router.get("/{id}")
async def buscar(id: str):
    pedido = await PedidoService.buscar_pedido(id)
    if not pedido:
        raise HTTPException(status_code=404, detail="Pedido não encontrado")
    return serialize(pedido)


@router.put("/{id}")
async def atualizar(id: str, pedido: PedidoCreate):
    result = await PedidoService.atualizar_pedido(id, pedido.dict())
    if not result:
        raise HTTPException(status_code=404, detail="Pedido não encontrado")
    return serialize(result)


@router.delete("/{id}")
async def deletar(id: str):
    result = await PedidoService.deletar_pedido(id)
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Pedido não encontrado")
    return {"msg": "Deletado com sucesso"}
