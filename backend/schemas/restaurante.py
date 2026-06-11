from pydantic import BaseModel, Field
from typing import Optional


class Endereco(BaseModel):
    dscTipoLogradouroRest: Optional[str] = None
    nomLogradouroRest: str
    numLogradouroRest: Optional[str] = None
    dscComplementoRest: Optional[str] = None
    dscBairroRest: Optional[str] = None
    numCepRest: Optional[str] = None
    dscCidadeRest: Optional[str] = None
    dscEstadoRest: Optional[str] = None


class RestauranteCreate(BaseModel):
    dscRazaoSocialRest: str
    numCNPJRest: str = Field(..., min_length=14, max_length=18)
    dscNomeFantasiaRest: Optional[str] = None
    numTelefoneRest: Optional[str] = None
    dscEmailRest: Optional[str] = None
    dscEnderecoRest: Endereco


class RestauranteResponse(BaseModel):
    _id: str
    dscRazaoSocialRest: str
    numCNPJRest: str
    dscNomeFantasiaRest: Optional[str] = None
    numTelefoneRest: Optional[str] = None
    dscEmailRest: Optional[str] = None
    dscEnderecoRest: Endereco
