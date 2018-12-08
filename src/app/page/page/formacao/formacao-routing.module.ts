import { Route } from '@angular/router';
import { FormacaoListaComponent } from './lista/formacao.lista.component';
import { FormacaoCadastroComponent } from './cadastro/formacao.cadastro.component';

export const FormacaoRoutes: Route[] = [
  {
    path: 'lista_formacao',
    component: FormacaoListaComponent,
  },
  {
    path: 'cadastro_formacao',
    component: FormacaoCadastroComponent,
  }, {
    path: 'cadastro_formacao/:idFormacao',
    component: FormacaoCadastroComponent,
  },
];
