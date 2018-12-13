import { Route } from '@angular/router';
import { ListaComponent } from './lista/lista.component';
import { CadastroComponent } from './cadastro/cadastro.component';

export const ProjetoRoutes: Route[] = [
  {
    path: 'projeto',
    children: [
      {
        path: '',
        component: ListaComponent,
        pathMatch: 'full',
      },
      {
        path: 'cadastro',
        component: CadastroComponent,
      }, {
        path: 'cadastro/:id',
        component: CadastroComponent,
      },
    ]
  },
];
