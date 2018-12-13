import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AppSnackBarService } from '../shared/utils/snackbar/app-snackbar.component';
import { DashboardComponent } from './dashboard.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
  ],
  providers: [
    AppSnackBarService,
  ]
})
export class DashboardModule { }
