import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SubcategoriaModel } from './subcategoriaModel';

export class SubcategoriaFiltro {

  id?: number;

  pagina: number = 0;
  itensPorPagina: number = 5;
}

@Injectable({
  providedIn: 'root'
})
export class SubcategoriaService {

  private subcategoriaUrl: String;

  constructor(private http: HttpClient) {
    this.subcategoriaUrl = `${environment.apiUrl}/subcategorias`;
  }

  pesquisar(filtro: SubcategoriaFiltro): Promise<any> {

    let params = new HttpParams()
      .set('page', filtro.pagina.toString())
      .set('size', filtro.itensPorPagina.toString());

    if ( filtro.id ) {
      params = params.set('id', filtro.id);
    }

    return firstValueFrom(this.http.get(`${this.subcategoriaUrl}/categoria`, { params }))
      .then((response:any) => {
        const subCategorias = response['content'];
        const resultado = { subCategorias, total : response['totalElements'] };
        return resultado;
      })
  }

  buscaTodos(): Promise<any> {
    return firstValueFrom( this.http.get<SubcategoriaModel>( `${this.subcategoriaUrl}/lista` ) );
  }

  buscaId(id: number): Promise<SubcategoriaModel> {
    return firstValueFrom( this.http.get<SubcategoriaModel>( `${this.subcategoriaUrl}/${id}` ) );
  }

  grava(subcategoriaModel: SubcategoriaModel): Promise<SubcategoriaModel> {
    return firstValueFrom( this.http.post<SubcategoriaModel>(`${this.subcategoriaUrl}`, subcategoriaModel) );
  }

  exclui(id: number): Promise<void> {
    return firstValueFrom( this.http.delete<void>(`${this.subcategoriaUrl}/${id}`) );
  }
}
