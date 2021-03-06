import { Route } from '@angular/router';
import { ListaComponent } from './lista/lista.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { paths } from '../app-paths';

export const ProjetoRoutes: Route[] = [
  {
    path: paths.projeto,
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
