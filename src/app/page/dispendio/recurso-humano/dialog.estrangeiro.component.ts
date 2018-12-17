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
    selector: 'app-dialog-estrangeiro',
    templateUrl: './dialog.estrangeiro.component.html',
    styleUrls: ['./dialog.recurso.humano.component.scss'],
    providers: [SepinService],
})
export class DialogEstrangeiroComponent extends BaseComponent implements OnInit {

    entity: any;
    msgObrigatorio = AppMessages.getObj(MSG001);
    adicionarNovo = false;
    entities: MatTableDataSource<any>;
    displayedColumns: string[] = ['NRNome', 'NRNumero', 'actions'];
    // @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    sexo: any[];
    paises: any[];

    constructor(
        public dialogRef: MatDialogRef<DialogEstrangeiroComponent>,
        public appSnackBarService: AppSnackBarService,
        public sepinService: SepinService,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        super(appSnackBarService);
    }

    ngOnInit(): void {
        this.entity = {};
        // console.log(this.paginator);
        // this.paginator._intl.itemsPerPageLabel = 'Registros por página';
        // this.paginator._intl.nextPageLabel = 'Siguiente';
        // this.paginator._intl.previousPageLabel = 'Anterior';
        // this.paginator._intl.firstPageLabel = 'Primeira Página';
        // this.paginator._intl.lastPageLabel = 'Última Página';
        this.consultar();
        this.recuperSexo();
        this.recuperPais();
    }

    consultar(): void {
        this.sepinService.fetchAll(MODULE_ESTRANGEIRO).subscribe(
            onNext => {
                this.montarEntities(onNext);
            }, onError => {
                this.addSnackBar(AppMessages.getObj(MSG100));
            }, () => {
            }
        );
    }

    fechar(): void {
        this.dialogRef.close();
    }

    novo(): void {
        this.entity = {};
        this.adicionarNovo = !this.adicionarNovo;
    }

    applyFilter(filterValue: string) {
        this.entities.filter = filterValue.trim().toLowerCase();
    }

    gravar(event: Event, form1: NgForm): void {
        event.preventDefault();
        if (!form1.valid) {
            this.addSnackBar(AppMessages.getObj(MSG001));
            return;
        }

        this.sepinService.salvarAndReturnId(MODULE_ESTRANGEIRO, this.entity).subscribe(
            onNext => {
                this.entity.IDEstrangeiro = onNext.value;
            }, onError => {
                if (onError.error) {
                    this.addSnackBar(AppMessages.getObjByMsg(onError.error.message, 'Erro'));
                } else {
                    this.addSnackBar(AppMessages.getObj(MSG101));
                }
            }, () => {
                this.dialogRef.close({ id: this.entity.IDEstrangeiro, name: this.entity.NRNome });
            }
        );
    }

    usar(row: any): void {
        this.dialogRef.close({ id: row.IDEstrangeiro, name: row.NRNome });
    }

    detalhar(row: any): void {
        this.adicionarNovo = true;
        this.entity = row;
    }

    recuperSexo(): void {
        this.sexo = [{ value: 'Masculino' }, { value: 'Feminino' }];
    }

    recuperPais(): void {
        this.paises = [{ value: 'Argentina' }, { value: 'Uruguai' }, { value: 'Bolivia' }];
    }

    private montarEntities(onNext: any) {
        this.entities = new MatTableDataSource<any>(onNext);
        // this.entities.paginator = this.paginator;
        this.entities.sort = this.sort;
    }


}
