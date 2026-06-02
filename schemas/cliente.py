from pydantic import BaseModel
from typing import Optional


class EnderecoCliente(BaseModel):
    dscTipoLogradouroClnt: Optional[str] = None
    nomLogradouroClnt: str
    numLogradouroClnt: Optional[str] = None
    dscComplementoClnt: Optional[str] = None
    dscBairroClnt: Optional[str] = None
    numCepClnt: Optional[str] = None
    dscCidadeClnt: Optional[str] = None
    dscEstadoClnt: Optional[str] = None


class ClienteCreate(BaseModel):
    nomClnt: str
    numCPFClnt: str
    numTelefoneClnt: str
    dscEmailClnt: str
    dscEnderecoClnt: EnderecoCliente


class ClienteResponse(BaseModel):
    idClnt: str
    nomClnt: str
    numCPFClnt: str
    numTelefoneClnt: str
    dscEmailClnt: str
    dscEnderecoClnt: EnderecoCliente
