import { Route } from '@angular/router';
import { AreaAplicacaoListaComponent } from './lista/area.aplicacao.lista.component';
import { AreaAplicacaoCadastroComponent } from './cadastro/area.aplicacao.cadastro.component';

export const AreaAplicacaoRoutes: Route[] = [
  {
    path: 'area_aplicacao',
    children: [
      {
        path: '',
        component: AreaAplicacaoListaComponent,
        pathMatch: 'full'
      },
      {
        path: 'cadastro',
        component: AreaAplicacaoCadastroComponent,
      },
      {
        path: 'cadastro/:idAreaAplicacao',
        component: AreaAplicacaoCadastroComponent,
      },
    ]
  },
];
