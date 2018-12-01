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

    open(message: string, customConfig: MatSnackBarConfig) {
        const config = new MatSnackBarConfig();
        config.verticalPosition = this.verticalPosition;
        config.horizontalPosition = this.horizontalPosition;
        config.duration = this.setAutoHide ? this.autoHide : 0;
        config.panelClass = this.addExtraClass ? ['snackbar-custom'] : undefined;
        this.snackBar.open(message, this.action ? this.actionButtonLabel : undefined, customConfig ? customConfig : config);
    }
}
