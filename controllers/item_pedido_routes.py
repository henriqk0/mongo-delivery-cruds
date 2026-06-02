from fastapi import APIRouter, HTTPException
from schemas.item_pedido import ItemPedidoCreate
from services.item_pedido_services import ItemPedidoService

router = APIRouter(prefix="/item-pedido", tags=["Itens do Pedido"])


def serialize(doc):
    return {
        "idItemp": str(doc["_id"]),
        "idPedidoItemp": doc["idPedidoItemp"],
        "idItemItemp": doc["idItemItemp"],
        "qtdItemItemp": doc["qtdItemItemp"],
        "valPrecoUnitarioItemp": doc["valPrecoUnitarioItemp"],
    }


@router.post("/")
async def criar(item: ItemPedidoCreate):
    result = await ItemPedidoService.criar_item_pedido(item.dict())
    return serialize(result)


@router.get("/")
async def listar():
    itens = await ItemPedidoService.listar_itens_pedido()
    return [serialize(i) for i in itens]


@router.get("/{id}")
async def buscar(id: str):
    item = await ItemPedidoService.buscar_item_pedido(id)
    if not item:
        raise HTTPException(status_code=404, detail="Item do pedido não encontrado")
    return serialize(item)


@router.put("/{id}")
async def atualizar(id: str, item: ItemPedidoCreate):
    result = await ItemPedidoService.atualizar_item_pedido(id, item.dict())
    if not result:
        raise HTTPException(status_code=404, detail="Item do pedido não encontrado")
    return serialize(result)


@router.delete("/{id}")
async def deletar(id: str):
    result = await ItemPedidoService.deletar_item_pedido(id)
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Item do pedido não encontrado")
    return {"msg": "Deletado com sucesso"}
