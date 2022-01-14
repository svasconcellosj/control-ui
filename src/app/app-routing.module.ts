import { CategoriaCadastroComponent } from './categoria/categoria-cadastro/categoria-cadastro.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoriaPesquisaComponent } from './categoria/categoria-pesquisa/categoria-pesquisa.component';
import { PlantaPesquisaComponent } from './planta/planta-pesquisa/planta-pesquisa.component';

const routes: Routes = [

  { path: 'categorias', component: CategoriaPesquisaComponent },
  { path: 'categorias/cadastro', component: CategoriaCadastroComponent },
  { path: 'categorias/:id', component: CategoriaCadastroComponent },

  { path: 'plantas', component: PlantaPesquisaComponent },
  { path: 'plantas/cadastro', component: PlantaPesquisaComponent },
  { path: 'plantas/:id', component: PlantaPesquisaComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
