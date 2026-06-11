from fastapi import APIRouter, HTTPException
from backend.schemas.pedido import PedidoCreate
from backend.services.pedido_services import PedidoService

router = APIRouter(prefix="/pedido", tags=["Pedidos"])


def serialize(doc):
    return {
        "_id": str(doc["_id"]),
        "idClientePed": doc.get("idClientePed", ""),
        "idRestaurantePed": doc.get("idRestaurantePed", ""),
        "idEntregadorPed": doc.get("idEntregadorPed"),
        "datPed": doc.get("datPed", ""),
        "horPed": doc.get("horPed", ""),
        "valTaxaentregaPed": doc.get("valTaxaentregaPed", 0.0),
        "valTotalPed": doc.get("valTotalPed", 0.0),
        "dscFormapagammentoPed": doc.get("dscFormapagammentoPed", ""),
        "dscStatusPed": doc.get("dscStatusPed", ""),
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
