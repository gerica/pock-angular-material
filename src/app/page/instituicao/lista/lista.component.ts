import { Component, OnInit, ViewChild, TemplateRef, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort, Sort, MatDialog } from '@angular/material';
import { DeleteDialogComponent, DeleteDialogData } from 'src/app/page/shared/utils/modal/delete/delete.dialog.component';
import { AppSnackBarService } from 'src/app/page/shared/utils/snackbar/app-snackbar.component';
import { BaseComponent } from '../../base.component';
import { AppMessages, MSG100, MSG002, MSG101, AppMessage } from 'src/app/page/shared/utils/app.messages';
import { SepinService } from 'src/app/page/shared/utils/service/sepin.service';
import { environment } from 'src/environments/environment';
import { paths } from '../../app-paths';

const MODULE_INSTITUICAO = environment.moduleInstituicao;
const URL_CADASTRO = `${paths.page}/${paths.instituicao}/cadastro`;


@Component({
  selector: 'app-area.instituicao-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
  providers: [SepinService]
})
export class ListaComponent extends BaseComponent implements OnInit {
  private idEntity = `ID${MODULE_INSTITUICAO.name}`;

  title = 'Instituição';
  entity: any;
  entities: MatTableDataSource<any>;
  displayedColumns: string[] = ['CDCodigo', 'NRNome', 'actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() templateRef: TemplateRef<any>;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    public appSnackBarService: AppSnackBarService,
    public sepinService: SepinService,
  ) {
    super(appSnackBarService);
  }

  ngOnInit() {
    this.entity = {};
    this.paginator._intl.itemsPerPageLabel = 'Registros por página';
    this.paginator._intl.nextPageLabel = 'Siguiente';
    this.paginator._intl.previousPageLabel = 'Anterior';
    this.paginator._intl.firstPageLabel = 'Primeira Página';
    this.paginator._intl.lastPageLabel = 'Última Página';
    this.consultar();
  }

  applyFilter(filterValue: string) {
    this.entities.filter = filterValue.trim().toLowerCase();
  }

  consultar(): void {
    this.sepinService.fetchAll(MODULE_INSTITUICAO).subscribe(
      onNext => {
        this.montarEntities(onNext);
      }, onError => {
        this.addSnackBar(AppMessages.getObj(MSG100));
      }, () => {
      }
    );
  }

  incluir(): void {
    this.router.navigate([URL_CADASTRO]);
  }

  preEdit(obj: any): void {
    this.router.navigate([URL_CADASTRO, obj[this.idEntity]]);
  }

  deleteRow(row: any) {
    const dataDialog: DeleteDialogData = { id: row[this.idEntity], title: 'Confirma a exclusão?', message: `Valor: ${row.NRNome}` };
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: dataDialog,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.delete) {
        this.sepinService.apagar(MODULE_INSTITUICAO, row[this.idEntity]).subscribe(
          onNext => { },
          onError => {
            if (onError.error) {
              this.addSnackBar(AppMessages.getObjByMsg(onError.error.message, 'Erro'));
            } else {
              this.addSnackBar(AppMessages.getObj(MSG101));
            }
          },
          () => {
            this.addSnackBar(AppMessages.getObj(MSG002));
            this.consultar();
          }
        );
      }
    });
  }

  private montarEntities(onNext: any) {
    this.entities = new MatTableDataSource<any>(onNext);
    this.entities.paginator = this.paginator;
    this.entities.sort = this.sort;
  }

}
