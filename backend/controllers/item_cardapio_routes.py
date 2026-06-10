from fastapi import APIRouter, HTTPException
from backend.schemas.item_cardapio import ItemCardapioCreate
from backend.services.item_cardapio_services import ItemCardapioService

router = APIRouter(prefix="/item_cardapio", tags=["Itens do Cardápio"])


def serialize(doc):
    return {
        "idItemc": str(doc["_id"]),
        "idRestauranteItemc": doc["idRestauranteItemc"],
        "dscNomeItemc": doc["dscNomeItemc"],
        "dscInformacaoItemc": doc.get("dscInformacaoItemc"),
        "valPrecoItemc": doc["valPrecoItemc"],
        "dscDisponibilidadeItemc": doc["dscDisponibilidadeItemc"],
    }


@router.post("/")
async def criar(item: ItemCardapioCreate):
    result = await ItemCardapioService.criar_item_cardapio(item.dict())
    return serialize(result)


@router.get("/")
async def listar():
    itens = await ItemCardapioService.listar_itens_cardapio()
    return [serialize(i) for i in itens]


@router.get("/{id}")
async def buscar(id: str):
    item = await ItemCardapioService.buscar_item_cardapio(id)
    if not item:
        raise HTTPException(status_code=404, detail="Item do cardápio não encontrado")
    return serialize(item)


@router.put("/{id}")
async def atualizar(id: str, item: ItemCardapioCreate):
    result = await ItemCardapioService.atualizar_item_cardapio(id, item.dict())
    if not result:
        raise HTTPException(status_code=404, detail="Item do cardápio não encontrado")
    return serialize(result)


@router.delete("/{id}")
async def deletar(id: str):
    result = await ItemCardapioService.deletar_item_cardapio(id)
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Item do cardápio não encontrado")
    return {"msg": "Deletado com sucesso"}
