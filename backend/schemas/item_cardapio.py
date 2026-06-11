from pydantic import BaseModel
from typing import Optional


class ItemCardapioCreate(BaseModel):
    idRestauranteItemc: str
    dscNomeItemc: str
    dscInformacaoItemc: Optional[str] = None
    valPrecoItemc: float
    dscDisponibilidadeItemc: str


class ItemCardapioResponse(BaseModel):
    _id: str
    idRestauranteItemc: str
    dscNomeItemc: str
    dscInformacaoItemc: Optional[str] = None
    valPrecoItemc: float
    dscDisponibilidadeItemc: str
