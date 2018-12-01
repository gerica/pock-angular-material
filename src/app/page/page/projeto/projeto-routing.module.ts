import { Route } from '@angular/router';
import { ProjetoListaComponent } from './lista/projeto.component';
import { ProjetoCadastroComponent } from './cadastro/projeto.cadastro.component';

export const ProjetoRoutes: Route[] = [
  {
    path: 'lista_projeto',
    component: ProjetoListaComponent,
  }, {
    path: 'cadastro_projeto',
    component: ProjetoCadastroComponent,
  },
];
