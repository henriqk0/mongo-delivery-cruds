import { Endereco } from './endereco';

export interface Cliente {
  idClnt: string;
  nomClnt: string;
  numCPFClnt: string;
  numTelefoneClnt: string;
  dscEmailClnt: string;
  dscEnderecoClnt: Endereco;
}

export interface ClienteCreate {
  nomClnt: string;
  numCPFClnt: string;
  numTelefoneClnt: string;
  dscEmailClnt: string;
  dscEnderecoClnt: Endereco;
}