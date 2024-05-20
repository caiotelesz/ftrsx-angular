import { Imovel } from './imovel'; // Assumindo que a interface Imovel está em um arquivo separado

export interface Aluguel {
  id?: number;
  nomeCliente: string;
  cpf: string;
  formaDePagamento: string;
  imovel: Imovel;
}
