import { ContaService } from './../../contas/conta.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CategoriaService } from 'src/app/categoria/categoria.service';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service.ts.service';
import { LancamentoModel } from '../lancamento-model';
import { LancamentoService } from '../lancamento.service';
import { ContaModel } from 'src/app/contas/conta-model';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  lancamentoModel = new LancamentoModel();
  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' }
  ];
  status = [
    { label: 'Pago', value: 'PAGO' },
    { label: 'A Pagar', value: "APAGAR" }
  ];
  listaCategorias: any[] = []; //lista de categorias
  listaContas: any[] = [];   //lista de contas
  contaModel = new ContaModel();
  valorLancamentoAnterior: number = 0;
  valorLancamentoNovo: number = 0;
  saldoConta: number = 0;
  @ViewChild('valor') valor!: any;
  movimentos =  [
    { label: 'RECEITAS', value: 'RECEITAS'},
    { label: 'INVESTIMENTOS', value: 'INVESTIMENTOS'},
    { label: 'FIXAS', value: 'FIXAS'},
    { label: 'VARIÁVEIS', value: 'VARIAVEIS'},
    { label: 'EXTRAS', value: 'EXTRAS'},
    { label: 'ADICIONAIS', value: 'ADICIONAIS'},
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
    this.carregaContas();
  }

  atualizaTitle() {
    this.title.setTitle(`Edição de: ${this.lancamentoModel.descricao}`)
  }

  get editandoLancamento() {
    return Boolean(this.lancamentoModel.id);
  }

  carregaLancamento(id: number) {
    this.lancamentoService.buscaId(id)
      .then( lancamento => {
        this.lancamentoModel = lancamento;
        this.valorLancamentoAnterior = this.lancamentoModel.valor!;
        this.carregaSaldoConta(this.lancamentoModel.conta.id!);
        this.atualizaTitle();
      })
      .catch( erro => this.errorHendler.handler(erro));
  }

  carregaCategorias() {
    return this.categoriaService.buscaTodos()
      .then( categorias => {
        this.listaCategorias = categorias.map( ( categoria: any ) => {
          return { label: categoria.descricao , value: categoria.id };
        });
      })
      .catch( erro => this.errorHendler.handler(erro) );
  }

  novoLancamento(form: NgForm) {
    form.reset(this.lancamentoModel.tipo);
    this.carregaContas();
    this.router.navigate(['lancamentos/cadastro']);
  }

  salvaLancamento(form: NgForm) {
    this.ajustaTipoLancamento();
    if ( this.editandoLancamento ) {
      this.alteraLancamento(form);
    } else {
      this.gravaLancamento(form);
    }
    this.carregaContas();
  }

  gravaLancamento(form: NgForm) {
    this.lancamentoService.grava(this.lancamentoModel)
      .then( lancamento => {
       this.calculaSaldo(form);
       this.contaService.grava(this.contaModel);
       this.messageService.add({severity:"success", summary:"Salvo!", detail:'Lançamento salvo com sucesso.'});
       this.messageService.add({severity:"success", summary:"Salvo!", detail:'Saldo atualizado!'});
       this.router.navigate(['lancamentos', lancamento.id]);
      })
      .catch(erro => this.errorHendler.handler(erro));
  }

  alteraLancamento(form: NgForm) {
    this.lancamentoService.altera(this.lancamentoModel)
    .then( lancamento => {
        this.calculaSaldo(form);
        this.contaService.grava(this.contaModel);
        this.messageService.add({severity:'success', summary:'Alterado!', detail:'Lançamento alterado com sucesso.'});
        this.messageService.add({severity:"success", summary:"Salvo!", detail:'Saldo atualizado!'});
        this.atualizaTitle();
      })
  }

  carregaContas() {
    this.contaService.buscaTodos()
      .then( contas => {
        this.listaContas = contas.map( (conta: any) => {
          return { label: conta.descricao+" -> Saldo em conta: R$ "+conta.saldo, value: conta.id };
        });
      })
      .catch( erro => this.errorHendler.handler(erro) );
  }

  ajustaTipoLancamento() {
    ( this.lancamentoModel.movimento === "RECEITAS" || this.lancamentoModel.movimento === "INVESTIMENTOS" ) ? this.lancamentoModel.tipo = "RECEITA" : this.lancamentoModel.tipo = "DESPESA";
  }

  temSaldo(form: NgForm) {
    this.ajustaTipoLancamento();
    if ( this.lancamentoModel.tipo == 'DESPESA' ) {
      if ( this.contaModel.saldo! < this.lancamentoModel.valor! ) {
        alert("SALDO NA CONTA INSUFICIENTE !!!!! ");
        this.valor.reset(0);
        return this.valor.invalid;
      }
    }
    return true;
  }

  carregaSaldoConta(id: number) {
    if ( id != null ) {
      return this.contaService.buscaId(id)
          .then( conta => {
              this.contaModel = conta;
              this.saldoConta = Number(this.contaModel.saldo);
          })
          .catch( erro => this.errorHendler.handler(erro) );
      }
    return 0;
  }

  calculaSaldo(form: NgForm) {
    if ( this.lancamentoModel.tipo == 'RECEITA' ) {
      if ( this.editandoLancamento ) {
        this.valorLancamentoNovo = this.lancamentoModel.valor! - this.valorLancamentoAnterior;
      } else {
        this.valorLancamentoNovo = this.lancamentoModel.valor!;
      }
      this.saldoConta += this.valorLancamentoNovo;
      this.contaModel.saldo! = this.saldoConta;
    } else {
      this.contaModel.saldo! -= this.lancamentoModel.valor!;
    }
    this.listaContas.forEach( item => {
      if ( item.value == this.lancamentoModel.conta.id ) {
        item.label = this.contaModel.descricao+" -> Saldo em conta: R$ "+this.contaModel.saldo;
      }
    });
  };

}
