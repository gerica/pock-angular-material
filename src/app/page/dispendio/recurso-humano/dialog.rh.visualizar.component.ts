import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { environment } from 'src/environments/environment';
import { AppMessages, MSG001, MSG100, MSG101 } from 'src/app/page/shared/utils/app.messages';
import { NgForm } from '@angular/forms';
import { SepinService } from 'src/app/page/shared/utils/service/sepin.service';
import { BaseComponent } from 'src/app/page/base.component';
import { AppSnackBarService } from 'src/app/page/shared/utils/snackbar/app-snackbar.component';

const MODULE_ESTRANGEIRO = environment.moduleEstrangeiro;
@Component({
    selector: 'app-dialog-rh-visualizar',
    templateUrl: './dialog.rh.visualizar.component.html',
    styleUrls: ['./dialog.recurso.humano.component.scss'],
    providers: [SepinService],
})
export class DialogRHVisualizarComponent extends BaseComponent implements OnInit {

    entity: any;
    msgObrigatorio = AppMessages.getObj(MSG001);

    constructor(
        public dialogRef: MatDialogRef<DialogRHVisualizarComponent>,
        public appSnackBarService: AppSnackBarService,
        public sepinService: SepinService,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        super(appSnackBarService);
    }

    ngOnInit(): void {
        this.entity = this.data;
    }

    fechar(): void {
        this.dialogRef.close();
    }

}
