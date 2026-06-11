from pydantic import BaseModel


class EntregadorCreate(BaseModel):
    nomEntrg: str
    numCNHEntrg: str
    dscPlacaVeiculoEntrg: str
    dscTipoVeiculoEntrg: str
    numTelefoneEntrg: str


class EntregadorResponse(BaseModel):
    _id: str
    nomEntrg: str
    numCNHEntrg: str
    dscPlacaVeiculoEntrg: str
    dscTipoVeiculoEntrg: str
    numTelefoneEntrg: str
