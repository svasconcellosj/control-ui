import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { CategoriaCadastroComponent } from './categoria/categoria-cadastro/categoria-cadastro.component';
import { CategoriaPesquisaComponent } from './categoria/categoria-pesquisa/categoria-pesquisa.component';
import { ContaCadastroComponent } from './contas/conta-cadastro/conta-cadastro.component';
import { ContaPesquisaComponent } from './contas/conta-pesquisa/conta-pesquisa.component';
import { LancamentoCadastroComponent } from './lancamento/lancamento-cadastro/lancamento-cadastro.component';
import { LancamentoPesquisaComponent } from './lancamento/lancamento-pesquisa/lancamento-pesquisa.component';
import { PlantaCadastroComponent } from './planta/planta-cadastro/planta-cadastro.component';
import { PlantaPesquisaComponent } from './planta/planta-pesquisa/planta-pesquisa.component';
import { TransferenciaCadastroComponent } from './transferencia/transferencia-cadastro/transferencia-cadastro.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },

  { path: 'contas', component: ContaPesquisaComponent },
  { path: 'contas/cadastro', component: ContaCadastroComponent },
  { path: 'contas/:id', component: ContaCadastroComponent },

  { path: 'lancamentos', component: LancamentoPesquisaComponent },
  { path: 'lancamentos/cadastro', component: LancamentoCadastroComponent },
  { path: 'lancamentos/:id', component: LancamentoCadastroComponent },

  { path: 'categorias', component: CategoriaPesquisaComponent },
  { path: 'categorias/cadastro', component: CategoriaCadastroComponent },
  { path: 'categorias/:id', component: CategoriaCadastroComponent },

  { path: 'transferencias', component: TransferenciaCadastroComponent },

  { path: 'plantas', component: PlantaPesquisaComponent },
  { path: 'plantas/cadastro', component: PlantaCadastroComponent },
  { path: 'plantas/:id', component: PlantaCadastroComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
