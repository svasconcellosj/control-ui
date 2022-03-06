import { DashboardService } from './../dashboard.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { ContaService } from 'src/app/contas/conta.service';
import { ContaModel } from 'src/app/contas/conta-model';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service.ts.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private autoAtulizacao: any;

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

  resumoReceitaMensal: number = 0;
  resumoDespesaMensal = 0;
  resumoReceitaAnual = 0;
  resumoDespesaAnual = 0;
  saldoMesAtual: number = 0;

  contaModel= new ContaModel();
  saldoContas = 0;

  constructor(
    private dashboardService : DashboardService,
    private title: Title,
    private datePipe: DatePipe,
    private errorHendler: ErrorHandlerService,
    private contaService: ContaService
  ) { }

  ngOnInit(): void {
    this.autoAtulizacao = setInterval(() => {
      this.atualizaDadosPagina();
    },300*1000);

    this.title.setTitle('Dashboard');
    this.atualizaDadosPagina();
  }

  ngOnDestroy() {
    clearInterval(this.autoAtulizacao);
  }

  atualizaDadosPagina() {
    this.carregaSaldoContas();
    this.GraficoRoscaTipoMensal(true);
    this.GraficoRoscaTipoMensal(false);
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

  GraficoRoscaTipoMensal(isMensal: boolean) {
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
        });
    } else {
      dataInicio = `${this.dataAnualInicio}`;
      dataFim = `${this.dataAnualFim}`;
      this.dashboardService.lancamentosPorTipo(dataInicio, dataFim)
        .then( dados => {
          this.dataTipoAnual = {
            labels: dados.map( dado => dado.tipo ),
            datasets: [{
              data: dados.map( dado => dado.total ),
              backgroundColor: ['#0000FF','#FF0000']
            }]
          };
        });
    }
    this.totalLancamentosReceitas(isMensal);
    this.totalLancamentosDespesas(isMensal);
  }

  getResumo() {
    this.saldoMesAtual = this.resumoReceitaMensal
  }

  carregaSaldoContas() {
    return this.contaService.saldoContas()
      .then( conta => {
        this.saldoContas = conta.saldo;
      })
      .catch( erro => this.errorHendler.handler(erro) );
  }

  totalLancamentosReceitas(isMensal: boolean) {
    let dataInicio: string;
    let dataFim: string;
    if ( isMensal ) {
      dataInicio = `${this.dataMensalInicio}`;
      dataFim = `${this.dataMensalFim}`;
      return this.dashboardService.totalLancamentosReceitas(dataInicio, dataFim)
        .then( (dado :any)=> { this.resumoReceitaMensal = dado.total; })
        .catch( erro => this.errorHendler.handler(erro) );
    } else {
      dataInicio = `${this.dataAnualInicio}`;
      dataFim = `${this.dataAnualFim}`;
      return this.dashboardService.totalLancamentosReceitas(dataInicio, dataFim)
        .then( (dado:any) => { this.resumoReceitaAnual = dado.total; })
        .catch( erro => this.errorHendler.handler(erro) );
    }
  }

  totalLancamentosDespesas(isMensal: boolean) {
    let dataInicio: string;
    let dataFim: string;
    if ( isMensal ) {
      dataInicio = `${this.dataMensalInicio}`;
      dataFim = `${this.dataMensalFim}`;
      return this.dashboardService.totalLancamentosDespesas(dataInicio, dataFim)
        .then( (dado :any)=> { this.resumoDespesaMensal = dado.total; })
        .catch( erro => this.errorHendler.handler(erro) );
    } else {
      dataInicio = `${this.dataAnualInicio}`;
      dataFim = `${this.dataAnualFim}`;
      return this.dashboardService.totalLancamentosDespesas(dataInicio, dataFim)
        .then( (dado:any) => { this.resumoDespesaAnual = dado.total; })
        .catch( erro => this.errorHendler.handler(erro) );
    }
  }

}
