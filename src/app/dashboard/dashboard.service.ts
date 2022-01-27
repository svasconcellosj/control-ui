import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
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

  lancamentosPorCategoria() : Promise<Array<any>> {
    return firstValueFrom( this.http.get(`${this.dashboardUrl}/estatisticas/por-categoria`) )
      .then( (response: any) => response );
  }

  estatisticaTipoCategoria() : Promise<Array<any>> {
    return firstValueFrom( this.http.get(`${this.dashboardUrl}/estatisticas/por-tipo`))
    .then( (response: any) => response );
  }
}
