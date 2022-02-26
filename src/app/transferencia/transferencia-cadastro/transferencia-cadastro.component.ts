import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';

import { ErrorHandlerService } from 'src/app/shared/error-handler.service.ts.service';
import { ContaModel } from 'src/app/contas/conta-model';
import { ContaService } from 'src/app/contas/conta.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transferencia-cadastro',
  templateUrl: './transferencia-cadastro.component.html',
  styleUrls: ['./transferencia-cadastro.component.css']
})
export class TransferenciaCadastroComponent implements OnInit {

  listaContas: any[] = [];
  contaModelOrigem = new ContaModel();
  contaModelDestino = new ContaModel();
  valorTransferencia: number = 0;
  novoSaldo: number = 0;

  constructor(
    private contaService: ContaService,
    private messageService: MessageService,
    private errorHendler: ErrorHandlerService,
    private router: Router,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.carregaContas();
  }

  novaTransferencia(form: NgForm) {
    form.reset();
    this.carregaContas();
    this.router.navigate(['transferencias']);
  }

  carregaContas() {
    this.contaService.buscaTodos()
      .then( contas => {
        this.listaContas = contas.map( (conta: any) => {
          return { label: conta.descricao+" -> Saldo: R$ "+conta.saldo, value: conta.id };
        });
      })
      .catch( erro => this.errorHendler.handler(erro) );
  }

  carregaConta(opc: String, id: number) {
    if ( id ) {
      this.contaService.buscaId(id)
        .then( conta => {
          if ( opc == 'ORIGEM' ) {
            this.contaModelOrigem = conta;
          } else {
            this.contaModelDestino = conta;
          }
        })
        .catch( erro => this.errorHendler.handler(erro) );
    }
  }

  temSaldo(form: NgForm) {
    if ( this.contaModelOrigem.saldo! < this.valorTransferencia ) {
      this.messageService.add({severity:"error", summary:"Negado!", detail:'SALDO NA CONTA INSUFICIENTE !!!!!'});
      form.reset();
      this.valorTransferencia = 0;
      return form.invalid;
    }
    return true;
  }

  salvaTransferencia(form: NgForm) {
    this.confirmationService.confirm({
      message: 'Transferir <strong>R$ ' + this.valorTransferencia + '</strong> da conta <strong>'+this.contaModelOrigem.descricao+'</strong> <br/>para a conta <strong>'+this.contaModelDestino.descricao+'</strong> ?',
      accept: () => {
        this.calculaSaldo();
        this.gravaTransferencia();
        this.novaTransferencia(form);
      }
    });
  }

  calculaSaldo() {
    this.contaModelDestino.saldo! += this.valorTransferencia;
    this.contaModelOrigem.saldo! -= this.valorTransferencia;
  }

  gravaTransferencia() {
    this.contaService.grava(this.contaModelDestino);
    this.contaService.grava(this.contaModelOrigem);
    this.messageService.add({severity:'success', summary:'Salvo!', detail:'Transferência executado com sucesso.'});
  }
}
