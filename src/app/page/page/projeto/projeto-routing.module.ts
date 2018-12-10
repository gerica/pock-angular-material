import { Route } from '@angular/router';
import { ProjetoListaComponent } from './lista/projeto.component';
import { ProjetoCadastroComponent } from './cadastro/projeto.cadastro.component';

export const ProjetoRoutes: Route[] = [
  {
    path: 'projeto',
    children: [
      {
        path: '',
        component: ProjetoListaComponent,
        pathMatch: 'full',
      },
      {
        path: 'cadastro',
        component: ProjetoCadastroComponent,
      }, {
        path: 'cadastro/:idProjeto',
        component: ProjetoCadastroComponent,
      },
    ]
  },
];
