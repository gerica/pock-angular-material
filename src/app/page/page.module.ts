import { NgModule } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { PageComponent } from './page.component';
import { MatCardModule } from '@angular/material/card';
import { ProjetoModule } from './projeto/projeto.module';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormacaoModule } from './formacao/formacao.module';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteDialogComponent } from './shared/utils/modal/delete/delete.dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { AreaAplicacaoModule } from './areaAplicacao/area.aplicacao.module';
import { ProjetoConveniadoModule } from './conveniado/conveniado.module';
import { InstituicaoModule } from './instituicao/instituicao.module';
import { DashboardModule } from './dashboard/dashboard.module';

@NgModule({
  declarations: [
    PageComponent,
    DeleteDialogComponent,
  ],
  entryComponents: [
    DeleteDialogComponent,
  ],
  imports: [
    HttpClientModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatSnackBarModule,
    MatDialogModule,
    MatButtonModule,
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
