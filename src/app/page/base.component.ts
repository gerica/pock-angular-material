import { Component, OnInit } from '@angular/core';
import { AppSnackBarService } from './shared/utils/snackbar/app-snackbar.component';
import { AppMessage } from './shared/utils/app.messages';

@Component({
    selector: 'app-base',
})
export class BaseComponent implements OnInit {

    constructor(public appSnackBarService: AppSnackBarService) { }

    ngOnInit() {
    }

    addSnackBar(obj: AppMessage) {
        this.appSnackBarService.open(obj.msg, obj.type);
    }

}
