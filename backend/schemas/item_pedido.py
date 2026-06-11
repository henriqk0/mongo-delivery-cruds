from pydantic import BaseModel


class ItemPedidoCreate(BaseModel):
    idPedidoItemp: str
    idItemItemp: str
    qtdItemItemp: int
    valPrecoUnitarioItemp: float


class ItemPedidoResponse(BaseModel):
    _id: str
    idPedidoItemp: str
    idItemItemp: str
    qtdItemItemp: int
    valPrecoUnitarioItemp: float
