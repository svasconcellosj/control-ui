import { PlantaModel } from './../planta-model';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from './../../shared/error-handler.service.ts.service';
import { MessageService } from 'primeng/api';
import { PlantaService } from './../planta.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-planta-cadastro',
  templateUrl: './planta-cadastro.component.html',
  styleUrls: ['./planta-cadastro.component.css']
})
export class PlantaCadastroComponent implements OnInit {

  plantaModel = new PlantaModel();
  emVaso: boolean = true;
  tpPlantio = [
    { label: "Estaquia", value: "ESTAQUIA"},
    { label: "Semente", value: "SEMENTE"},
    { label: "Alporquia", value: "ALPORQUIA"}
  ];

  constructor(
    private plantaService: PlantaService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private routeActive: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle("Cadastro de Plantas");
    const idPlanta = this.routeActive.snapshot.params["id"];
    if ( idPlanta ) {
      this.carregaPlanta(idPlanta);
    }
  }

  novaPlanta(form: NgForm) {
    form.reset();
    this.router.navigate(['plantas/cadastro']);
  }

  get editandoPlanta() {
    return Boolean(this.plantaModel.id);
  }

  carregaPlanta( id: number ) {
    this.plantaService.buscaId(id)
      .then( planta => {
        this.plantaModel = planta;
        this.atualizaTitle();
      })
      .catch(erro => this.errorHandler.handler(erro));
  }

  atualizaTitle() {
    this.title.setTitle(`Edição de: ${this.plantaModel.nome}`);
  }

  salvaPlanta( form: NgForm) {
    if ( this.editandoPlanta ) {
      this.alteraPlanta(form);
    } else {
      this.gravaPlanta(form);
    }

  }

  gravaPlanta( form: NgForm ) {
    this.plantaService.grava(this.plantaModel )
      .then( planta => {
        this.messageService.add({severity:'success', summary:'Salvo!', detail:'Planta '+planta.nome+' salva com sucesso.'});
        this.router.navigate( ['plantas', planta.id] );
      })
      .catch( erro => this.errorHandler.handler(erro) );
  }

  alteraPlanta( form : NgForm ) {
    this.plantaService.altera(this.plantaModel)
      .then( planta => {
        this.messageService.add({severity:'success', summary:'Alterada!', detail:'Planta '+planta.nome+' alterada com sucesso.'});
        this.atualizaTitle();
      } );
  }

}
