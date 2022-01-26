import { CategoriaModel } from "../categoria/categoria-model";

export class LancamentoModel {

  id?: number;
  descricao?: string;
  dataPagamento?: Date;
  valor?: number;
  observacao?: string;
  tipo = 'RECEITA';
  statusPagamento = 'A PAGAR';
  qtdRepeticao?: number;
  idCategoria = new CategoriaModel();

}
