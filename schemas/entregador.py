from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class EntregadorCreate(BaseModel):
    nomEntrg: str
    numCNHEntrg: str
    dscPlacaVeiculoEntrg: str
    dscTipoVeiculoEntrg: str
    numTelefoneEntrg: str

class EntregadorResponse(BaseModel):
    id: str
    nomEntrg: str
    numCNHEntrg: str
    dscPlacaVeiculoEntrg: str
    dscTipoVeiculoEntrg: str
    numTelefoneEntrg: str
