from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class PedidoCreate(BaseModel):
    idClientePed: str
    idRestaurantePed: str
    idEntregadorPed: Optional[str] = None
    datPed: str
    horPed: str
    valTaxaentregaPed: float
    valTotalPed: float = 0
    dscFormapagammentoPed: str
    dscStatusPed: str


class PedidoResponse(BaseModel):
    _id: str
    idClientePed: str
    idRestaurantePed: str
    idEntregadorPed: Optional[str] = None
    datPed: datetime
    horPed: datetime
    valTaxaentregaPed: float
    valTotalPed: float
    dscFormapagammentoPed: str
    dscStatusPed: str
