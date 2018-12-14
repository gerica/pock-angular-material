import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjetoRoutes } from './page/projeto/projeto-routing.module';
import { FormacaoRoutes } from './page/formacao/formacao-routing.module';
import { AreaAplicacaoRoutes } from './page/areaAplicacao/area.aplicacao-routing.module';
import { ProjetoConveniadoRoutes } from './page/conveniado/conveniado-routing.module';
import { InstituicaoRoutes } from './page/instituicao/instituicao-routing.module';
import { DashboardRoutes } from './page/dashboard/dashboard-routing.module';
import { RecursoHumanoRoutes } from './page/dispendio/recurso-humano/rh-routing.module';

const routes: Routes = [
  ...ProjetoRoutes,
  ...FormacaoRoutes,
  ...AreaAplicacaoRoutes,
  ...ProjetoConveniadoRoutes,
  ...InstituicaoRoutes,
  ...DashboardRoutes,
  ...RecursoHumanoRoutes,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
