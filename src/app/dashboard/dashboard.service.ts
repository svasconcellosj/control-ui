import { firstValueFrom } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private dashboardUrl: string;

  constructor(
    private http: HttpClient,
    private datePipe: DatePipe
  ) {
    this.dashboardUrl = `${environment.apiUrl}/lancamentos`
  }

  lancamentosPorCategoria(dataInicio: string, dataFim: string) : Promise<Array<any>> {
    let params = new HttpParams()
      .set('dataInicio', dataInicio)
      .set('dataFim', dataFim);

    return firstValueFrom( this.http.get(`${this.dashboardUrl}/estatisticas/por-categoria`, { params }) )
      .then( (response: any) => response );
  }

  lancamentosPorTipo(dataInicio: string, dataFim: string) : Promise<Array<any>> {
    let params = new HttpParams()
      .set('dataInicio', dataInicio)
      .set('dataFim', dataFim);
    return firstValueFrom( this.http.get(`${this.dashboardUrl}/estatisticas/por-tipo`, { params }) )
      .then( (response: any) => response );
  }
}
