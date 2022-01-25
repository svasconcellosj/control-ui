import { CategoriaModel } from "../categoria/categoria-model";

export class LancamentoModel {

  id?: number;
  descricao?: string;
  dataPagamento?: Date;
  dataVencimento?: Date;
  valor?: number;
  observacao?: string;
  tipo = 'RECEITA';
  statusPagamento = 'A PAGAR';
  categoria = new CategoriaModel();

}
