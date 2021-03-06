import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { ContaModel } from 'src/app/contas/conta-model';
import { ContaService } from 'src/app/contas/conta.service';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service.ts.service';
import { LancamentoModel } from '../lancamento-model';
import { LancamentoFiltro, LancamentoService } from '../lancamento.service';

@Component({
  selector: 'app-lancamento-pesquisa',
  templateUrl: './lancamento-pesquisa.component.html',
  styleUrls: ['./lancamento-pesquisa.component.css']
})
export class LancamentoPesquisaComponent implements OnInit {

  filtro = new LancamentoFiltro();
  totalRegistros = 0;
  loading: boolean = false;
  lancamentosPesquisa: LancamentoModel[] = [];
  @ViewChild('gridTable') gridTable!: any;

  contaModel = new ContaModel();
  saldoConta: number = 0;

  constructor(
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private confirmationservice: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private title: Title,

    private contaService: ContaService
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Pesquisa de Laçamentos');
  }

  pesquisar(pagina: number = 0) {
    this.loading = true;
    this.filtro.pagina = pagina;
    this.lancamentoService.pesquisa( this.filtro )
      .then( (resultado: any) => {
        this.lancamentosPesquisa = resultado.lancamentos;
        this.totalRegistros = resultado.total;
        this.loading = false;
      })
      .catch((error) => this.errorHandler.handler(error));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event!.first! / event!.rows!;
    this.pesquisar(pagina);
  }

  confirmarExclusao(lancamento: any) : void {
    this.confirmationservice.confirm({
      message: 'Tem certeza que deseja excluir o lançamento <strong>' + lancamento.descricao + '</strong> ?',
      accept: () => {
        this.excluiLancamento(lancamento);
      }
    });
  }

  excluiLancamento(lancamento: any) {
    this.lancamentoService.exclui(lancamento.id)
    .then( () => {
        this.atualizaSaldoConta(lancamento.conta.id, lancamento);
        this.contaService.grava(this.contaModel);
        this.gridTable.reset();
        this.messageService.add({severity:'success', summary:'Excluído!', detail:'Lançamento excluído com sucesso.'});
        this.messageService.add({severity:"success", summary:"Salvo!", detail:'Saldo atualizado!'});
      })
      .catch((error) => this.errorHandler.handler(error));
  }

  atualizaSaldoConta(id: number, lancamento: any) {
      return this.contaService.buscaId(id)
          .then( conta => {
            this.contaModel = conta;
            this.saldoConta = this.contaModel.saldo + lancamento.valor;
            this.contaModel.saldo = this.saldoConta;
          } )
          .catch( erro => this.errorHandler.handler(erro) );
  }

}
