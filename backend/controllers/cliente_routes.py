from fastapi import APIRouter, HTTPException
from backend.schemas.cliente import ClienteCreate
from backend.services.cliente_services import ClienteService

router = APIRouter(prefix="/cliente", tags=["Clientes"])


def serialize(doc):
    endereco = doc.get("dscEnderecoClnt", {})
    return {
        "idClnt": str(doc["_id"]),
        "nomClnt": doc["nomClnt"],
        "numCPFClnt": doc["numCPFClnt"],
        "numTelefoneClnt": doc["numTelefoneClnt"],
        "dscEmailClnt": doc["dscEmailClnt"],
        "dscEnderecoClnt": {
            "dscTipoLogradouroClnt": endereco.get("dscTipoLogradouroClnt"),
            "nomLogradouroClnt": endereco["nomLogradouroClnt"],
            "numLogradouroClnt": endereco.get("numLogradouroClnt"),
            "dscComplementoClnt": endereco.get("dscComplementoClnt"),
            "dscBairroClnt": endereco.get("dscBairroClnt"),
            "numCepClnt": endereco.get("numCepClnt"),
            "dscCidadeClnt": endereco.get("dscCidadeClnt"),
            "dscEstadoClnt": endereco.get("dscEstadoClnt"),
        },
    }


@router.post("/")
async def criar(cliente: ClienteCreate):
    result = await ClienteService.criar_cliente(cliente.dict())
    return serialize(result)


@router.get("/")
async def listar():
    clientes = await ClienteService.listar_clientes()
    return [serialize(c) for c in clientes]


@router.get("/{id}")
async def buscar(id: str):
    cliente = await ClienteService.buscar_cliente(id)
    if not cliente:
        raise HTTPException(status_code=404, detail="Cliente não encontrado")
    return serialize(cliente)


@router.put("/{id}")
async def atualizar(id: str, cliente: ClienteCreate):
    result = await ClienteService.atualizar_cliente(id, cliente.dict())
    if not result:
        raise HTTPException(status_code=404, detail="Cliente não encontrado")
    return serialize(result)


@router.delete("/{id}")
async def deletar(id: str):
    result = await ClienteService.deletar_cliente(id)
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Cliente não encontrado")
    return {"msg": "Deletado com sucesso"}
