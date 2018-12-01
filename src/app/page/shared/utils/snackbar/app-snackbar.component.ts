import { Component, ViewEncapsulation, Injectable } from '@angular/core';
import {
    MatSnackBar,
    MatSnackBarConfig,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition,
} from '@angular/material';

// @Component({
//     selector: 'app-snack-bar-component',
//     templateUrl: 'app-snackbar.component.html',
//     styles: [`
//       .example-pizza-party {
//         color: hotpink;
//       }
//     `],
// })
@Injectable()
export class AppSnackBarService {
    actionButtonLabel = 'Fechar';
    action: Boolean = true;
    setAutoHide: Boolean = true;
    autoHide = 2000;
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'bottom';
    addExtraClass: Boolean = true;

    constructor(public snackBar: MatSnackBar) {
    }

    open(message: string, type: string) {
        const config = new MatSnackBarConfig();
        config.verticalPosition = this.verticalPosition;
        config.horizontalPosition = this.horizontalPosition;
        config.duration = this.setAutoHide ? this.autoHide : 0;

        switch (type) {
            case 'Erro':
                config.panelClass = ['snackbar-error'];
                break;
            case 'Alerta':
                config.panelClass = ['snackbar-warning'];
                break;
            case 'Sucesso':
                config.panelClass = ['snackbar-success'];
                break;

            default:
                config.panelClass = ['snackbar-default'];
                break;
        }
        this.snackBar.open(message, this.action ? this.actionButtonLabel : undefined, config);
    }
}
