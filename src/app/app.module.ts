import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CategoriaPesquisaComponent } from './categoria/categoria-pesquisa/categoria-pesquisa.component';
import { HeaderComponent } from './header/header.component';
import { PrimengImportsModule } from './shared/primeng-imports/primeng-imports.module';
import { CategoriaCadastroComponent } from './categoria/categoria-cadastro/categoria-cadastro.component';
import { MessageComponent } from './shared/message/message.component';
import { PlantaPesquisaComponent } from './planta/planta-pesquisa/planta-pesquisa.component';
import { PlantaCadastroComponent } from './planta/planta-cadastro/planta-cadastro.component';
import { LancamentoPesquisaComponent } from './lancamento/lancamento-pesquisa/lancamento-pesquisa.component';
import { LancamentoCadastroComponent } from './lancamento/lancamento-cadastro/lancamento-cadastro.component';
import { ErrorHandlerService } from './shared/error-handler.service.ts.service';

import { DatePipe, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { ContaPesquisaComponent } from './contas/conta-pesquisa/conta-pesquisa.component';
import { ContaCadastroComponent } from './contas/conta-cadastro/conta-cadastro.component';
import { TransferenciaComponent } from './transferencia/transferencia/transferencia.component';
registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [
    AppComponent,

    HeaderComponent,
    CategoriaPesquisaComponent,
    CategoriaCadastroComponent,
    MessageComponent,
    PlantaPesquisaComponent,
    PlantaCadastroComponent,
    LancamentoPesquisaComponent,
    LancamentoCadastroComponent,
    DashboardComponent,
    ContaPesquisaComponent,
    ContaCadastroComponent,
    TransferenciaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,

    PrimengImportsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR'}, /* Altera a região da página para portugues Brasil */
    ErrorHandlerService,
    DatePipe,
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
