import { Imovel } from './imovel';

export interface Aluguel {
  id?: number;
  nomeCliente: string;
  cpf: string;
  formaDePagamento: string;
  imovel: Imovel;
}
