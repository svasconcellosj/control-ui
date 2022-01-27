import { PlantaModel } from './planta-model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

export class FiltroPlanta {
  nome?: string;

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

    if ( filtro.nome ) {
      params = params.set('nome', filtro.nome);
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

  buscaId(id: number ): Promise<PlantaModel> {
    return firstValueFrom( this.http.get<PlantaModel>(`${this.plantasUrl}/${id}`) );
  }

  grava(plantaModel: PlantaModel) : Promise<PlantaModel> {
    return firstValueFrom( this.http.post<PlantaModel>(this.plantasUrl, plantaModel ) );
  }

  altera(plantaModel : PlantaModel ) : Promise<PlantaModel> {
    return firstValueFrom( this.http.put<PlantaModel>(`${this.plantasUrl}/${plantaModel.id}`, plantaModel) );
  }

}
