import { DashboardService } from './../dashboard.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  pieChartData: any;
  barChartData: any;

  constructor(
    private dashboardService : DashboardService,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Dashboard');
    this.configurarGraficoPizza()
    this.configuraGraficoBarra()
  }

  configurarGraficoPizza() {
    this.dashboardService.lancamentosPorCategoria()
      .then( dados => {
        this.pieChartData = {
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

  configuraGraficoBarra() {
    this.dashboardService.estatisticaTipoCategoria()
      .then( dados => {
        this.barChartData = {
          labels: dados.map( dado => dado.tipo),
          datasets: [{
            data: dados.map( dado => dado.total),
            backgroundColor: ['#0000FF','#FF0000']
          }]
        };
      });
  }

}
