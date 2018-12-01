import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    ProjetoListaComponent,
    ProjetoCadastroComponent,
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatDividerModule,
    MatTableModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  providers: []
})
export class ProjetoModule { }
