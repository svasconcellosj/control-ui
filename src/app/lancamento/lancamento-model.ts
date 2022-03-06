import { CategoriaModel } from "../categoria/categoria-model";
import { SubcategoriaModel } from "../categoria/subcategoria/subcategoriaModel";
import { ContaModel } from "../contas/conta-model";

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
  idSubcategoria = new SubcategoriaModel();
  conta = new ContaModel();
  movimento = 'RECEITAS';

}
