import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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

@NgModule({
  declarations: [
    AppComponent,

    HeaderComponent,
    CategoriaPesquisaComponent,
    CategoriaCadastroComponent,
    MessageComponent,
    PlantaPesquisaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,

    PrimengImportsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
