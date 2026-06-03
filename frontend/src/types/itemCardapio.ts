import { Endereco } from './endereco';

export interface ItemCardapio {
  idItemc: string;
  idRestauranteItemc: string;
  dscNomeItemc: string;
  dscInformacaoItemc?: string;
  valPrecoItemc: number;
  dscDisponibilidadeItemc: string;
}

export interface ItemCardapioCreate {
  idRestauranteItemc: string;
  dscNomeItemc: string;
  dscInformacaoItemc?: string;
  valPrecoItemc: number;
  dscDisponibilidadeItemc: string;
}