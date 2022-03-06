import { firstValueFrom } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ContaModel } from './conta-model';

export class ContaFiltro {

  descricao?: string;

  pagina: number = 0;
  itensPorPagina: number = 10;
}

@Injectable({
  providedIn: 'root'
})
export class ContaService {

  private contaUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this.contaUrl = `${environment.apiUrl}/contas`;
  }

  pesquisar(filtro: ContaFiltro) : Promise<any> {
    let params = new HttpParams()
        .set('page', filtro.pagina)
        .set('size', filtro.itensPorPagina);

    if ( filtro.descricao ) {
      params = params.set('descricao', filtro.descricao );
    }

    return firstValueFrom( this.http.get(`${this.contaUrl}`, { params }) )
        .then((response : any) => {
          const contas = response['content'];
          const resultado = { contas, total: response['totalElements'] };
          return resultado;
        });
  }

  grava(contaModel: ContaModel) : Promise<ContaModel> {
    return firstValueFrom( this.http.post<ContaModel>(this.contaUrl, contaModel));
  }

  exclui(id: number) : Promise<void> {
    return firstValueFrom( this.http.delete<void>(`${this.contaUrl}/${id}`));
  }

  buscaId(id: number) : Promise<ContaModel> {
    return firstValueFrom( this.http.get<ContaModel>(`${this.contaUrl}/${id}`));
  }

  altera(contaModel: ContaModel) : Promise<ContaModel> {
    return firstValueFrom( this.http.put<ContaModel>(`${this.contaUrl}/${contaModel.id}`, contaModel ));
  }

  buscaTodos() : Promise<any> {
    return firstValueFrom( this.http.get<ContaModel>(`${this.contaUrl}/lista`));
  }

  saldoContas() : Promise<any> {
    return firstValueFrom( this.http.get<ContaModel>(`${this.contaUrl}/total-saldos`));
  }

}
