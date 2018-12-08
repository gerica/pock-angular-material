import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjetoRoutes } from './page/page/projeto/projeto-routing.module';
import { FormacaoRoutes } from './page/page/formacao/formacao-routing.module';

const routes: Routes = [
  ...ProjetoRoutes,
  ...FormacaoRoutes,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
