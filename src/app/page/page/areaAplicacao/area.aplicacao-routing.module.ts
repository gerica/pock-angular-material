import { Route } from '@angular/router';
import { AreaAplicacaoListaComponent } from './lista/area.aplicacao.lista.component';
import { AreaAplicacaoCadastroComponent } from './cadastro/area.aplicacao.cadastro.component';

export const AreaAplicacaoRoutes: Route[] = [
  {
    path: 'lista_area_aplicacao',
    component: AreaAplicacaoListaComponent,
  },
  {
    path: 'cadastro_area_aplicacao',
    component: AreaAplicacaoCadastroComponent,
  }, {
    path: 'cadastro_area_aplicacao/:idAreaAplicacao',
    component: AreaAplicacaoCadastroComponent,
  },
];
