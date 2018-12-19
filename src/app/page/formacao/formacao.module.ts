import { NgModule } from '@angular/core';
import { ListaComponent } from './lista/lista.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ListaComponent,
    CadastroComponent,
  ],
  imports: [
    SharedModule,
  ],
  providers: []
})
export class FormacaoModule { }
