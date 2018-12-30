import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjetoRoutes } from './page/projeto/projeto-routing.module';
import { FormacaoRoutes } from './page/formacao/formacao-routing.module';
import { AreaAplicacaoRoutes } from './page/areaAplicacao/area.aplicacao-routing.module';
import { ProjetoConveniadoRoutes } from './page/conveniado/conveniado-routing.module';
import { InstituicaoRoutes } from './page/instituicao/instituicao-routing.module';
import { DashboardRoutes } from './page/dashboard/dashboard-routing.module';
import { NotFoundComponent } from './page/notFound/not.found.component';
import { PathResolveService } from './page/notFound/path.resolve.service';
import { LoginComponent } from './login/login.component';
import { PageComponent } from './page/page.component';
import { paths } from './page/app-paths';
import { PageRoutes } from './page/page-routing.module';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  ...PageRoutes,
  {
    path: '**',
    resolve: {
      path: PathResolveService
    },
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
