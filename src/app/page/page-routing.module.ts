import { Route } from '@angular/router';
import { ProjetoRoutes } from './projeto/projeto-routing.module';
import { FormacaoRoutes } from './formacao/formacao-routing.module';
import { AreaAplicacaoRoutes } from './areaAplicacao/area.aplicacao-routing.module';
import { ProjetoConveniadoRoutes } from './conveniado/conveniado-routing.module';
import { InstituicaoRoutes } from './instituicao/instituicao-routing.module';
import { DashboardRoutes } from './dashboard/dashboard-routing.module';
import { PageComponent } from './page.component';
import { paths } from './app-paths';

export const PageRoutes: Route[] = [
  {
    path: paths.page,
    component: PageComponent,
    children: [
      ...ProjetoRoutes,
      ...FormacaoRoutes,
      ...AreaAplicacaoRoutes,
      ...ProjetoConveniadoRoutes,
      ...InstituicaoRoutes,
      ...DashboardRoutes,
    ]
  },
];
