import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LancamentoModel } from './lancamento-model';

export class LancamentoFiltro {

  descricao?: string;

  pagina: number = 0;
  itensPorPagina: number = 10;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  private lancamentosUrl: string;

  constructor(private http: HttpClient) {
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
  }

  pesquisa(filtro: LancamentoFiltro): Promise<any> {
    let params = new HttpParams()
        .set('page', filtro.pagina)
        .set('size', filtro.itensPorPagina);

    if ( filtro.descricao ) {
      params = params.set('descricao', filtro.descricao );
    }

    return firstValueFrom( this.http.get(`${this.lancamentosUrl}`, { params }) )
        .then((response : any) => {
          const lancamentos = response['content'];
          const resultado = { lancamentos, total: response['totalElements'] };
          return resultado;
        });
  }

  grava(lancamentoModel: LancamentoModel): Promise<LancamentoModel> {
    return firstValueFrom( this.http.post<LancamentoModel>( this.lancamentosUrl, lancamentoModel ));
  }

  exclui(id: number): Promise<void> {
    return firstValueFrom( this.http.delete<void>( `${this.lancamentosUrl}/${id}`) );
  }

  buscaId(id: number): Promise<LancamentoModel> {
    return firstValueFrom( this.http.get<LancamentoModel>( `${this.lancamentosUrl}/${id}`) );
  }

  altera(lancamentoModel: LancamentoModel): Promise<LancamentoModel> {
    return firstValueFrom( this.http.put<LancamentoModel>(`${this.lancamentosUrl}/${lancamentoModel.id}`, lancamentoModel) );
  }

}
