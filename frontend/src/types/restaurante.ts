import { Endereco } from './endereco';

export interface Restaurante {
  idRest: string;
  dscRazaoSocialRest: string;
  numCNPJRest: string;
  dscNomeFantasiaRest?: string;
  numTelefoneRest?: string;
  dscEmailRest?: string;
  dscEnderecoRest: Endereco;
}

export interface RestauranteCreate {
  dscRazaoSocialRest: string;
  numCNPJRest: string;
  dscNomeFantasiaRest?: string;
  numTelefoneRest?: string;
  dscEmailRest?: string;
  dscEnderecoRest: Endereco;
}