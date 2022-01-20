import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

export class FiltroPlanta {
  descricao?: string;

  pagina: number = 0;
  itensPorPagina: number = 5;
}

@Injectable({
  providedIn: 'root',
})
export class PlantaService {
  private plantasUrl: string;

  constructor(private http: HttpClient) {
    this.plantasUrl = `${environment.apiUrl}/plantas`;
  }

  pesquisar(filtro: FiltroPlanta): Promise<any> {

    let params = new HttpParams()
      .set('page', filtro.pagina.toString())
      .set('size', filtro.itensPorPagina.toString());

    if ( filtro.descricao ) {
      params = params.set('descricao', filtro.descricao);
    }

    return firstValueFrom( this.http.get(`${this.plantasUrl}`, { params } ))
      .then( (response:any) => {
        const plantas = response['content'];
        const resultado = { plantas, total: response['totalElements'] };
        return resultado;
      });
  }

  exclui(id: number): Promise<void> {
    return firstValueFrom( this.http.delete<void>(`${this.plantasUrl}/${id}`) );
  }

}
