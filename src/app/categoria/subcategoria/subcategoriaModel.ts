import { CategoriaModel } from "../categoria-model";

export class SubcategoriaModel {

  id?: number;
  descricao?: string;
  idCategoria = new CategoriaModel();
}
