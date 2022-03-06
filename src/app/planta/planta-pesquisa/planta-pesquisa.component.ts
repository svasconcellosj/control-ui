import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';

import { ErrorHandlerService } from 'src/app/shared/error-handler.service.ts.service';
import { PlantaModel } from '../planta-model';
import { FiltroPlanta, PlantaService } from '../planta.service';


@Component({
  selector: 'app-planta-pesquisa',
  templateUrl: './planta-pesquisa.component.html',
  styleUrls: ['./planta-pesquisa.component.css']
})
export class PlantaPesquisaComponent implements OnInit {

  plantasPesquisa: PlantaModel[] = [];
  filtro = new FiltroPlanta();
  totalRegistros = 0;
  @ViewChild('gridTabela') gridTabela!: any;
  loading: boolean = false;

  constructor(
    private plantaService: PlantaService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Pesquisa de categorias');
    this.plantasPesquisar();
  }

  plantasPesquisar(pagina: number = 0): void {
    this.loading = true;
    this.filtro.pagina = pagina;
    this.plantaService.pesquisar( this.filtro )
      .then( (resultado: any ) => {
        this.plantasPesquisa = resultado.plantas;
        this.totalRegistros = resultado.total;
        this.loading = false;
      });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event!.first! / event!.rows!;
    this.plantasPesquisar(pagina);
  }

  excluiCategoria( plantaModel: any ) {
    this.plantaService.exclui(plantaModel.id)
    .then( () => {
      this.gridTabela.reset();
      this.messageService.add({severity:'success', summary:'Excluído!', detail:'Planta excluída com sucesso.'});
    })
    .catch( (error) => this.errorHandler.handler(error) );
  }

  confirmarExclusao(plantaModel: any): void {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir a planta <strong>' + plantaModel.nome + '</strong> ?',
      accept: () => {
          this.excluiCategoria(plantaModel);
      }
    });

  }

}
