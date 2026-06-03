export interface Pedido {
  idPed: string;
  idClientePed: string;
  idRestaurantePed: string;
  idEntregadorPed?: string;
  datPed: string;
  horPed: string;
  valTaxaentregaPed: number;
  valTotalPed: number;
  dscFormapagammentoPed: string;
  dscStatusPed: string;
}

export interface PedidoCreate {
  idClientePed: string;
  idRestaurantePed: string;
  idEntregadorPed?: string;
  datPed: string;
  horPed: string;
  valTaxaentregaPed: number;
  valTotalPed: number;
  dscFormapagammentoPed: string;
  dscStatusPed: string;
}