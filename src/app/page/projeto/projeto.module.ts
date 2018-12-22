import { NgModule } from '@angular/core';
import { ListaComponent } from './lista/lista.component';
import { CadastroComponent } from './cadastro/cadastro.component';

import { DialogRecursoHumanoComponent } from '../dispendio/recurso-humano/dialog.recurso.humano.component';
import { DialogEstrangeiroComponent } from '../dispendio/recurso-humano/dialog.estrangeiro.component';
import { DialogRHVisualizarComponent } from '../dispendio/recurso-humano/dialog.rh.visualizar.component';
import { DialogEquipamentoSoftwareComponent } from '../dispendio/equipamento-software/dialog.equipamento.software.component';
import { SharedModule } from '../shared/shared.module';
import { DialogPropriedadeIntelectualComponent } from '../propriedadeIntelectual/dialog.propriedade.intelectual.component';

@NgModule({
  declarations: [
    ListaComponent,
    CadastroComponent,
    DialogRecursoHumanoComponent,
    DialogEstrangeiroComponent,
    DialogRHVisualizarComponent,
    DialogEquipamentoSoftwareComponent,
    DialogPropriedadeIntelectualComponent,
  ],
  entryComponents: [
    DialogRecursoHumanoComponent,
    DialogEstrangeiroComponent,
    DialogRHVisualizarComponent,
    DialogEquipamentoSoftwareComponent,
    DialogPropriedadeIntelectualComponent,
  ],
  imports: [
    SharedModule,
  ],
  providers: []
})
export class ProjetoModule { }
