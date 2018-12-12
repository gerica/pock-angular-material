import { Route } from '@angular/router';
import { ListaComponent } from './lista/lista.component';
import { CadastroComponent } from './cadastro/cadastro.component';

export const InstituicaoRoutes: Route[] = [
  {
    path: 'instituicao',
    children: [
      {
        path: '',
        component: ListaComponent,
        pathMatch: 'full'
      },
      {
        path: 'cadastro',
        component: CadastroComponent,
      },
      {
        path: 'cadastro/:id',
        component: CadastroComponent,
      },
    ]
  },
];
