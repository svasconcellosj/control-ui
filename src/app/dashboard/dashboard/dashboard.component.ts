import { DashboardService } from './../dashboard.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  //dataAtual = new Date().toLocaleDateString(); //formato dd/MM/yyyy
  dataAtual = new Date();
  dataMensalInicio = this.datePipe.transform(new Date(this.dataAtual.getFullYear(), this.dataAtual.getMonth(), 1), 'yyyy-MM-dd');
  dataMensalFim = this.datePipe.transform(new Date(this.dataAtual.getFullYear(), this.dataAtual.getMonth() + 1, 0), 'yyyy-MM-dd');
  dataAnualInicio = this.datePipe.transform(new Date(this.dataAtual.getFullYear(), 0, 1), 'yyyy-MM-dd');
  dataAnualFim = this.datePipe.transform(new Date(this.dataAtual.getFullYear(), 12, 0), 'yyyy-MM-dd');

  dataTipoMensal: any;
  dataTipoAnual: any;
  dataCategoriaMensal: any;
  dataCategoriaAnual: any;
  resumoReceitaMensal = 0;
  resumoDespesaMensal = 0;
  resumoReceitaAnual = 0;
  resumoDespesaAnual = 0;

  constructor(
    private dashboardService : DashboardService,
    private title: Title,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Dashboard');
    this.GraficoBarraTipoMensal(true);
    this.GraficoBarraTipoMensal(false);
    this.GraficoPizzaCategoriaMensal(true);
    this.GraficoPizzaCategoriaMensal(false);
  }

  GraficoPizzaCategoriaMensal(isMensal: boolean) {
    let dataInicio: string;
    let dataFim: string;
    if ( isMensal ) {
      dataInicio = `${this.dataMensalInicio}`;
      dataFim = `${this.dataMensalFim}`;
      this.dashboardService.lancamentosPorCategoria(dataInicio, dataFim)
        .then( dados => {
          this.dataCategoriaMensal = {
            labels: dados.map(dado => dado.categoria.descricao),
            datasets: [ {
              data: dados.map( dado => dado.total ),
              backgroundColor: ['#FF4500','#FF8C00','#FFA500',   //laranja
                                '#FFD700','#FFFF00','#F0E68C',    //amarelo
                                '#836FFF','#191970','#6495ED','#4682B4',  //azul
                                '#00FF7F','#008000','#7FFF00','#6B8E23',  //verde
                                '#DAA520','#8B4513','#D2691E','#DEB887', //marrom
                                '#C71585','#FF69B4','#F08080','#DC143C', //rosa
                                '#8B0000','#FA8072','#FF6347','#FF0000',  //vermelho
                              ]
            }]
          };
        });
    } else {
      dataInicio = `${this.dataAnualInicio}`;
      dataFim = `${this.dataAnualFim}`;
      this.dashboardService.lancamentosPorCategoria(dataInicio, dataFim)
        .then( dados => {
          this.dataCategoriaAnual = {
            labels: dados.map(dado => dado.categoria.descricao),
            datasets: [ {
              data: dados.map( dado => dado.total ),
              backgroundColor: ['#FF4500','#FF8C00','#FFA500',   //laranja
                                '#FFD700','#FFFF00','#F0E68C',    //amarelo
                                '#836FFF','#191970','#6495ED','#4682B4',  //azul
                                '#00FF7F','#008000','#7FFF00','#6B8E23',  //verde
                                '#DAA520','#8B4513','#D2691E','#DEB887', //marrom
                                '#C71585','#FF69B4','#F08080','#DC143C', //rosa
                                '#8B0000','#FA8072','#FF6347','#FF0000',  //vermelho
                              ]
            }]
          };
        });
    }
  }

  GraficoBarraTipoMensal(isMensal: boolean) {
    let dataInicio: string;
    let dataFim: string;
    if ( isMensal ) {
      dataInicio = `${this.dataMensalInicio}`;
      dataFim = `${this.dataMensalFim}`;
      this.dashboardService.lancamentosPorTipo(dataInicio, dataFim)
        .then( dados => {
          this.dataTipoMensal = {
            labels: dados.map( dado => dado.tipo),
            datasets: [{
              data: dados.map( dado => dado.total),
              backgroundColor: ['#0000FF','#FF0000']
            }]
          };
          this.resumoReceitaMensal = dados[0].total;
          this.resumoDespesaMensal = dados[1].total;
        });
    } else {
      dataInicio = `${this.dataAnualInicio}`;
      dataFim = `${this.dataAnualFim}`;
      this.dashboardService.lancamentosPorTipo(dataInicio, dataFim)
        .then( dados => {
          this.dataTipoAnual = {
            labels: dados.map( dado => dado.tipo),
            datasets: [{
              data: dados.map( dado => dado.total),
              backgroundColor: ['#0000FF','#FF0000']
            }]
          };
          this.resumoReceitaAnual = dados[0].total;
          this.resumoDespesaAnual = dados[1].total;
        });
    }
  }

}
