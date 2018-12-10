import { Route } from '@angular/router';
import { FormacaoListaComponent } from './lista/formacao.lista.component';
import { FormacaoCadastroComponent } from './cadastro/formacao.cadastro.component';

export const FormacaoRoutes: Route[] = [
  {
    path: 'formacao',
    children: [
      {
        path: '',
        component: FormacaoListaComponent,
        pathMatch: 'full'
      },
      {
        path: 'cadastro',
        component: FormacaoCadastroComponent,
      }, {
        path: 'cadastro/:idFormacao',
        component: FormacaoCadastroComponent,
      },
    ]
  },
];
