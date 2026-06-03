from pydantic import BaseModel
from typing import Optional


class ItemPedidoCreate(BaseModel):
    idPedidoItemp: str
    idItemItemp: str
    qtdItemItemp: int
    valPrecoUnitarioItemp: float


class ItemPedidoResponse(BaseModel):
    idItemp: str
    idPedidoItemp: str
    idItemItemp: str
    qtdItemItemp: int
    valPrecoUnitarioItemp: float
