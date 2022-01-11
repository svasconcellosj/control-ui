import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service.ts.service';

import { CategoriaModel } from '../categoria-model';
import { CategoriaFiltro, CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-categoria-pesquisa',
  templateUrl: './categoria-pesquisa.component.html',
  styleUrls: ['./categoria-pesquisa.component.css']
})
export class CategoriaPesquisaComponent implements OnInit {

  filtro = new CategoriaFiltro();
  totalRegistros = 0;
  categoria: any[] = [];
  categoriaModel: CategoriaModel[] = [];
  @ViewChild('gridTabela') gridTabela!: any;

  constructor(
    private categoriaService: CategoriaService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de categorias');
    this.pesquisar();
   }

  pesquisar(pagina: number = 0): void {
    this.filtro.pagina = pagina;
    this.categoriaService.pesquisar( this.filtro )
      .then( ( resultado: any ) => {
        this.categoria = resultado.categorias;
        this.totalRegistros = resultado.total;
      })
      .catch((error) => this.errorHandler.handler(error));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event!.first! / event!.rows!;
    this.pesquisar(pagina);
  }

  excluiCategoria( categoriaModel: any ) {
    this.categoriaService.exclui(categoriaModel.id)
    .then( () => {
      this.gridTabela.reset();
      this.messageService.add({severity:'success', summary:'Excluído!', detail:'Categoria excluída com sucesso.'});
    })
    .catch((error) => this.errorHandler.handler(error));
  }

  confirmarExclusao(categoriaModel: any): void {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir a categoria <strong>' + categoriaModel.descricao + '</strong> ?',
      accept: () => {
          this.excluiCategoria(categoriaModel);
      }
    });

  }

}
