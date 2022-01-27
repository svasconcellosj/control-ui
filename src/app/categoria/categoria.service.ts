import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';
import { CategoriaModel } from './categoria-model';

export class CategoriaFiltro {

  descricao?: string;

  pagina: number = 0;
  itensPorPagina: number = 5;
}

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private categoriasUrl: string;

  constructor(private http: HttpClient) {
    this.categoriasUrl = `${environment.apiUrl}/categorias`;
}

  pesquisar(filtro: CategoriaFiltro): Promise<any> {

    let params = new HttpParams()
      .set('page', filtro.pagina.toString())
      .set('size', filtro.itensPorPagina.toString());

    if ( filtro.descricao ) {
      params = params.set('descricao', filtro.descricao);
    }

    return firstValueFrom(this.http.get(`${this.categoriasUrl}`, { params }))
      .then((response:any) => {
        const categorias = response['content'];
        const resultado = { categorias, total : response['totalElements'] };
        return resultado;
      })
  }

  grava(categoriaModel: CategoriaModel): Promise<CategoriaModel> {
    return firstValueFrom( this.http.post<CategoriaModel>( this.categoriasUrl, categoriaModel ) );
  }

  exclui(id: number): Promise<void> {
    return firstValueFrom( this.http.delete<void>(`${this.categoriasUrl}/${id}`) );
  }

  altera( categoriaModel: CategoriaModel): Promise<CategoriaModel> {
    return firstValueFrom( this.http.put<CategoriaModel>( `${ this.categoriasUrl}/${categoriaModel.id}`, categoriaModel ));
  }

  buscaId(id: number): Promise<CategoriaModel> {
    return firstValueFrom( this.http.get<CategoriaModel>( `${this.categoriasUrl}/${id}` ) );
  }

  buscaTodos(): Promise<any> {
    return firstValueFrom( this.http.get<CategoriaModel>( `${this.categoriasUrl}` ) )
    .then( (response: any) => response['content']);
  }

  gerarListagem() {
    return firstValueFrom( this.http.get(`${this.categoriasUrl}/listagem-categorias`, { responseType: 'blob' }));
  }

}
