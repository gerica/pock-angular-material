import { NgModule } from '@angular/core';
import { PageComponent } from './page.component';
import { ProjetoModule } from './projeto/projeto.module';
import { FormacaoModule } from './formacao/formacao.module';
import { DeleteDialogComponent } from './shared/utils/modal/delete/delete.dialog.component';
import { AreaAplicacaoModule } from './areaAplicacao/area.aplicacao.module';
import { ProjetoConveniadoModule } from './conveniado/conveniado.module';
import { InstituicaoModule } from './instituicao/instituicao.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { SharedModule } from './shared/shared.module';
import { NotFoundComponent } from './notFound/not.found.component';

@NgModule({
  declarations: [
    PageComponent,
    DeleteDialogComponent,
    NotFoundComponent,
  ],
  entryComponents: [
    DeleteDialogComponent,
  ],
  imports: [
    SharedModule,
    ProjetoModule,
    FormacaoModule,
    AreaAplicacaoModule,
    ProjetoConveniadoModule,
    InstituicaoModule,
    DashboardModule,
  ],
  exports: [DeleteDialogComponent],
  providers: [],
})
export class PageModule { }
