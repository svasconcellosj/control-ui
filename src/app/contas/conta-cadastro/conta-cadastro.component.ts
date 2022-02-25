import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service.ts.service';
import { ContaModel } from '../conta-model';
import { ContaService } from '../conta.service';

@Component({
  selector: 'app-conta-cadastro',
  templateUrl: './conta-cadastro.component.html',
  styleUrls: ['./conta-cadastro.component.css']
})
export class ContaCadastroComponent implements OnInit {

  contaModel = new ContaModel();

  constructor(
    private contaService: ContaService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private routeActive: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.altualizaTitle();
    const idConta = this.routeActive.snapshot.params['id'];
    if (idConta) {
      this.carregaConta(idConta);
    }
  }

  altualizaTitle(edita: boolean = false) {
      let txt: string = 'Cadastro de contas';
      if ( edita ) {
        txt = `Edição de: ${this.contaModel.descricao}`;
      }
      this.title.setTitle(txt);
  }

  salvaConta(form: NgForm) {
    if ( this.editandoConta ) {
      this.alteraConta(form);
    } else {
      this.gravaConta(form);
    }
  }

  gravaConta(form: NgForm) {
    this.contaService.grava(this.contaModel)
      .then( conta => {
        this.messageService.add({severity:'success', summary:'Salvo!', detail:'Conta salva com sucesso.'});
        this.router.navigate(['contas', conta.id ]);
      })
      .catch(erro => this.errorHandler.handler(erro));
  }

  alteraConta(form: NgForm) {
    this.contaService.altera(this.contaModel)
      .then( conta => {
        this.messageService.add({severity:'success', summary:'Alterada!', detail:'Conta alterada com sucesso.'});
        this.altualizaTitle(true);
      })
      .catch(erro => this.errorHandler.handler(erro));
  }

  novaConta(form: NgForm) {
    form.reset();
    this.router.navigate(['contas/cadastro']);
  }

  carregaConta(id: number) {
    this.contaService.buscaId(id)
      .then( conta => {
        this.contaModel = conta;
        this.altualizaTitle(true);
      })
  }

  get editandoConta() {
    return Boolean(this.contaModel.id);
  }

}
