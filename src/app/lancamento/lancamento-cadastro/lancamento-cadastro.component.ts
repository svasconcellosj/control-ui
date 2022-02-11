import { ContaService } from './../../contas/conta.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CategoriaService } from 'src/app/categoria/categoria.service';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service.ts.service';
import { LancamentoModel } from '../lancamento-model';
import { LancamentoService } from '../lancamento.service';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  lancamentoModel = new LancamentoModel();
  categorias: any[] = [];
  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' }
  ];
  status = [
    { label: 'Pago', value: 'PAGO' },
    { label: 'A Pagar', value: "APAGAR" }
  ];
  contas: any[] = [];
  movimentos =  [
    { label: 'Receitas', value: 'RECEITAS'},
    { label: 'Investimentos', value: 'INVESTIMENTOS'},
    { label: 'Fixas', value: 'FIXAS'},
    { label: 'Variáveis', value: 'VARIAVEIS'},
    { label: 'Extras', value: 'EXTRAS'},
    { label: 'Adicionais', value: 'ADICIONAIS'},
  ];

  constructor(
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private errorHendler: ErrorHandlerService,
    private router: Router,
    private routeActive: ActivatedRoute,
    private categoriaService: CategoriaService,
    private title: Title,
    private contaService: ContaService
  ) { }

  ngOnInit(): void {
    const idLancamento = this.routeActive.snapshot.params['id'];
    if ( idLancamento ) {
      this.carregaLancamento(idLancamento);
    }
    this.atualizaTitle();

    this.carregaCategorias();
    this.carregaConta();
  }

  atualizaTitle() {
    this.title.setTitle(`Edição de: ${this.lancamentoModel.descricao}`)
  }

  get editandoLancamento() {
    return Boolean(this.lancamentoModel.id);
  }

  carregaLancamento( id: number ) {
    this.lancamentoService.buscaId(id)
      .then( lancamento => {
        console.log(lancamento);
        this.lancamentoModel = lancamento;
        this.atualizaTitle();
      })
      .catch( erro => this.errorHendler.handler(erro));
  }

  carregaCategorias() {
    return this.categoriaService.buscaTodos()
      .then( categorias => {
        this.categorias = categorias.map( ( categoria: any ) => {
          return { label: categoria.descricao , value: categoria.id };
        });
      })
      .catch( erro => this.errorHendler.handler(erro) );
  }

  novoLancamento(form: NgForm) {
    form.reset(this.lancamentoModel.tipo);
    this.router.navigate(['lancamentos/cadastro']);
  }

  salvaLancamento(form: NgForm) {
    if ( this.editandoLancamento ) {
      this.alteraLancamento(form);
    } else {
      this.gravaLancamento(form);
    }
  }

  gravaLancamento( form: NgForm) {
    ( this.lancamentoModel.movimento === "RECEITAS" || this.lancamentoModel.movimento === "INVESTIMENTOS" ) ? this.lancamentoModel.tipo = "RECEITA" : this.lancamentoModel.tipo = "DESPESA";
    this.lancamentoService.grava(this.lancamentoModel)
      .then( lancamento => {
       this.messageService.add({severity:"success", summary:"Salvo!", detail:'Lançamento '+lancamento.descricao+' salvo com sucesso.'});
       this.router.navigate(['lancamentos', lancamento.id]);
      })
      .catch(erro => this.errorHendler.handler(erro));
  }

  alteraLancamento( form: NgForm ) {
    ( this.lancamentoModel.movimento === "RECEITAS" || this.lancamentoModel.movimento === "INVESTIMENTOS" ) ? this.lancamentoModel.tipo = "RECEITA" : this.lancamentoModel.tipo = "DESPESA";
    this.lancamentoService.altera(this.lancamentoModel)
      .then( lancamento => {
        this.messageService.add({severity:'success', summary:'Alterado!', detail:'Lançamento '+lancamento.descricao+' alterado com sucesso.'});
        this.atualizaTitle();
      })
  }

  carregaConta() {
    return this.contaService.buscaTodos()
      .then( contas => {
        this.contas = contas.map( (conta: any) => {
          return { label: conta.descricao, value: conta.id };
        });
      })
      .catch( erro => this.errorHendler.handler(erro) );
  }

}
