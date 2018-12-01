import { NgModule } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { PageComponent } from './page.component';
import { MatCardModule } from '@angular/material/card';
import { ProjetoModule } from './projeto/ projeto.module';
import { HttpClientModule } from '@angular/common/http';

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
  ],
  providers: [],
})
export class PageModule { }
