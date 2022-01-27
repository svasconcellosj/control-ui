import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service.ts.service';

import { CategoriaModel } from '../categoria-model';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-categoria-cadastro',
  templateUrl: './categoria-cadastro.component.html',
  styleUrls: ['./categoria-cadastro.component.css']
})
export class CategoriaCadastroComponent implements OnInit {

  categoriaModel = new CategoriaModel();

  statusCategoria = [
    { label: 'Inativo', value: false },
    { label: 'Ativo', value: true }
  ];

  tipoCategoria = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' }
  ];

  constructor(
    private categoriaService: CategoriaService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private routeActive: ActivatedRoute,
    private router: Router,
    private title: Title
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
      })
      .catch(erro => this.errorHandler.handler(erro));
  }

  get editandoCategoria() {
    return Boolean(this.categoriaModel.id);
  }

  altualizaTitle() {
      this.title.setTitle(`Edição de: ${this.categoriaModel.descricao}`);
  }

}
