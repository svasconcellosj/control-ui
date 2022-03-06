import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service.ts.service';

import { CategoriaModel } from '../categoria-model';
import { CategoriaService } from '../categoria.service';
import { SubcategoriaService, SubcategoriaFiltro } from '../subcategoria/subcategoria.service';
import { SubcategoriaModel } from '../subcategoria/subcategoriaModel';

@Component({
  selector: 'app-categoria-cadastro',
  templateUrl: './categoria-cadastro.component.html',
  styleUrls: ['./categoria-cadastro.component.css']
})
export class CategoriaCadastroComponent implements OnInit {

  categoriaModel = new CategoriaModel();
  subcategoriaFiltro = new SubcategoriaFiltro();

  statusCategoria = [
    { label: 'Ativo', value: true },
    { label: 'Inativo', value: false }
  ];

  tipoCategoria = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' }
  ];

  subCategorias: any[] = [];
  totalRegistros: number = 0;
  loading: boolean = false;
  subcategoriaModel!: SubcategoriaModel;
  exibindoFormularioSubcategoria: boolean = false;

  @ViewChild('gridTabelaSubcategoria') gridTabelaSubcategoria!: any;

  aux: number = 0;


  constructor(
    private categoriaService: CategoriaService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private routeActive: ActivatedRoute,
    private router: Router,
    private title: Title,
    private subcategoriaService: SubcategoriaService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Cadastro de categorias');
    const idCategoria = this.routeActive.snapshot.params['id'];
    if (idCategoria) {
      this.carregaCategoria(idCategoria);
    }
  }

  salvaCategoria( form: NgForm ) {
    if ( this.editandoCategoria ) {
      this.alteraCategoria(form);
    } else {
      this.gravaCategoria(form);
    }
  }

  gravaCategoria( form: NgForm ) {
    this.categoriaService.grava(this.categoriaModel)
      .then( categoria => {
        this.messageService.add({severity:'success', summary:'Salvo!', detail:'Categoria '+categoria.descricao+' salva com sucesso.'});
        this.router.navigate(['categorias', categoria.id ]);
      })
      .catch(erro => this.errorHandler.handler(erro));
  }

  alteraCategoria( form: NgForm ) {
    this.categoriaService.altera(this.categoriaModel)
      .then ( categoria => {
        this.messageService.add({severity:'success', summary:'Alterada!', detail:'Categoria '+categoria.descricao+' alterada com sucesso.'});
        this.altualizaTitle();
      });
  }

  novaCategoria( form: NgForm ) {
    form.reset();
     this.router.navigate(['categorias/cadastro']);
  }

  carregaCategoria(id: number) {
    this.categoriaService.buscaId(id)
      .then(categoria => {
        this.categoriaModel = categoria;
        this.altualizaTitle();
        this.pesquisaSubcategorias();
      })
      .catch(erro => this.errorHandler.handler(erro));
  }

  get editandoCategoria() {
    return Boolean(this.categoriaModel.id);
  }

  altualizaTitle() {
      this.title.setTitle(`Edição de: ${this.categoriaModel.descricao}`);
  }

  pesquisaSubcategorias(pagina: number = 0) {
    this.loading = true;
      this.subcategoriaFiltro.pagina = pagina;
      this.subcategoriaFiltro.id = this.categoriaModel.id;
      this.subcategoriaService.pesquisar( this.subcategoriaFiltro )
        .then( (resultado: any) => {
          this.subCategorias = resultado.subCategorias;
          this.totalRegistros = resultado.total;
          this.loading = false;
        })
        .catch((error) => this.errorHandler.handler(error));
  }

  prepararNovoContato() {
    this.exibindoFormularioSubcategoria = true;
    this.subcategoriaModel = new SubcategoriaModel();
    this.subcategoriaModel.idCategoria = this.categoriaModel;
  }

  salvaSubcategoria(form: NgForm) {
    this.exibindoFormularioSubcategoria = false;
    this.subcategoriaService.grava(this.subcategoriaModel)
      .then( () => {
        this.messageService.add({severity:'success', summary:'Salvo!', detail:'Subcategoria salva com sucesso.'});
      })
      .catch(erro => this.errorHandler.handler(erro));
    form.reset();
    this.carregaCategoria(this.subcategoriaModel.idCategoria.id!);
    this.gridTabelaSubcategoria.reset();
  }

  editaSubcategoria(subcategoria: SubcategoriaModel) {
    this.exibindoFormularioSubcategoria = true;
    this.subcategoriaModel = subcategoria;
    this.subcategoriaModel.idCategoria = this.categoriaModel;
}

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event!.first! / event!.rows!;
    this.pesquisaSubcategorias(pagina);
  }

  excluiCategoria( subcategoriaModel: any ) {
    this.subcategoriaService.exclui(subcategoriaModel.id)
    .then( () => {
      this.gridTabelaSubcategoria.reset();
      this.messageService.add({severity:'success', summary:'Excluído!', detail:'Subcategoria excluída com sucesso.'});
    })
    .catch((error) => this.errorHandler.handler(error));
  }

  confirmarExclusao(subcategoriaModel: any): void {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir a subcategoria <strong>' + subcategoriaModel.descricao + '</strong> ?',
      accept: () => {
          this.excluiCategoria(subcategoriaModel);
      }
    });
  }
}
