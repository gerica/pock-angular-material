import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProjetoListaComponent } from './lista/projeto.component';
import { ProjetoCadastroComponent } from './cadastro/projeto.cadastro.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { DeleteDialogComponent } from '../../shared/utils/modal/delete/delete.dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AppSnackBarService } from '../../shared/utils/snackbar/app-snackbar.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    ProjetoListaComponent,
    ProjetoCadastroComponent,
    DeleteDialogComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatDividerModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
  ],
  entryComponents: [
    DeleteDialogComponent
  ],
  providers: [
    AppSnackBarService,
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  ]
})
export class ProjetoModule { }
