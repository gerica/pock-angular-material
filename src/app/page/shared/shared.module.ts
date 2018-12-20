import { CommonModule, registerLocaleData } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatSnackBarModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatDividerModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatStepperModule,
    MatRadioModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatTabsModule,
    MatGridListModule,
    MAT_DATE_LOCALE,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
} from '@angular/material';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { AppSnackBarService } from './utils/snackbar/app-snackbar.component';
import localePt from '@angular/common/locales/pt';
import { NgxCurrencyModule } from 'ngx-currency';
import { TextMaskModule } from 'angular2-text-mask';
import { RouterModule } from '@angular/router';
registerLocaleData(localePt);

const MATERIAL_MODULES = [
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatSnackBarModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatDividerModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatStepperModule,
    MatRadioModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatTabsModule,
    MatGridListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
];

const NGX_MODULES = [
    NgxCurrencyModule,
];

@NgModule({
    imports: [CommonModule],
    declarations: [],
    exports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        TextMaskModule,
        RouterModule,
        ...MATERIAL_MODULES,
        ...NGX_MODULES,
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                AppSnackBarService,
                { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
            ]
        };
    }
}
