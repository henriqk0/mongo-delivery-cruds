export interface Entregador {
  idEntrg: string;
  nomEntrg: string;
  numCNHEntrg: string;
  dscPlacaVeiculoEntrg: string;
  dscTipoVeiculoEntrg: string;
  numTelefoneEntrg: string;
}

export interface EntregadorCreate {
  nomEntrg: string;
  numCNHEntrg: string;
  dscPlacaVeiculoEntrg: string;
  dscTipoVeiculoEntrg: string;
  numTelefoneEntrg: string;
}