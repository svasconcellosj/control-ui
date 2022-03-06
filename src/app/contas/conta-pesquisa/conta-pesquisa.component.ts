import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service.ts.service';
import { ContaModel } from '../conta-model';
import { ContaService, ContaFiltro } from '../conta.service';

@Component({
  selector: 'app-conta-pesquisa',
  templateUrl: './conta-pesquisa.component.html',
  styleUrls: ['./conta-pesquisa.component.css']
})
export class ContaPesquisaComponent implements OnInit {

  contaPesquisa: ContaModel[] = [];
  filtro = new ContaFiltro();
  totalRegistros = 0;
  @ViewChild('gridTable') gridTable!: any;
  loading: boolean = false;

  constructor(
    private contaService: ContaService,
    private messageService: MessageService,
    private confirmationservice: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Pesquisa de contas');
    this.pesquisar();
  }

  pesquisar(pagina: number = 0) {
    this.loading = true;
    this.filtro.pagina = pagina;
    this.contaService.pesquisar(this.filtro)
      .then( (resultado: any) => {
        this.contaPesquisa = resultado.contas;
        this.totalRegistros = resultado.total;
        this.loading = false;
      })
      .catch((error) => this.errorHandler.handler(error));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event!.first! / event!.rows!;
    this.pesquisar(pagina);
  }

  confirmarExclusao(conta: any) {
    this.confirmationservice.confirm({
      message: 'Tem certeza que deseja excluir a conta <strong>' + conta.descricao + '</strong> ?',
      accept: () => {
          this.excluiConta(conta);
      }
    });
  }

  excluiConta(conta: any) {
    this.contaService.exclui(conta.id)
      .then( () => {
        this.gridTable.reset();
        this.messageService.add({severity:'success', summary:'Excluído!', detail:'Conta excluída com sucesso.'});
      })
      .catch((error) => this.errorHandler.handler(error));
  }

}
