import { NgModule } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { PageComponent } from './page.component';
import { MatCardModule } from '@angular/material/card';
import { ProjetoModule } from './projeto/ projeto.module';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    PageComponent,
  ],
  imports: [
    HttpClientModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    ProjetoModule,
    MatSnackBarModule
  ],
  providers: [],
})
export class PageModule { }
