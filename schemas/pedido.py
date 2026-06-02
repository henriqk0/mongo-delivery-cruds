from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class PedidoCreate(BaseModel):
    idClientePed: str
    idRestaurantePed: str
    idEntregadorPed: Optional[str] = None
    valTaxaentregaPed: float
    valTotalPed: float
    dscFormapagammentoPed: str
    dscStatusPed: str


class PedidoResponse(BaseModel):
    idPed: str
    idClientePed: str
    idRestaurantePed: str
    idEntregadorPed: Optional[str] = None
    datPed: datetime
    horPed: datetime
    valTaxaentregaPed: float
    valTotalPed: float
    dscFormapagammentoPed: str
    dscStatusPed: str
