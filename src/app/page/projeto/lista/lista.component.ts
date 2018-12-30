import { Component, OnInit, ViewChild, TemplateRef, Input } from '@angular/core';
import { ProjetoService } from '../service/projeto.service';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort, Sort, MatDialog } from '@angular/material';
import { DeleteDialogComponent, DeleteDialogData } from 'src/app/page/shared/utils/modal/delete/delete.dialog.component';
import { AppSnackBarService } from 'src/app/page/shared/utils/snackbar/app-snackbar.component';
import { BaseComponent } from '../../base.component';
import { AppMessages, MSG100, MSG002, MSG101, AppMessage } from 'src/app/page/shared/utils/app.messages';
import { SepinService } from 'src/app/page/shared/utils/service/sepin.service';
import { environment } from 'src/environments/environment';
import { forkJoin } from 'rxjs';
import { paths } from '../../app-paths';

const MODULE_TIPO_PROJETO = environment.moduleTipoProjeto;
const MODULE_PROJETO = environment.moduleProjeto;
const URL_PROJETO_CADASTRO = `${paths.page}/${paths.projeto}/cadastro`;

@Component({
  selector: 'app-projeto-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
  providers: [ProjetoService, SepinService]
})
export class ListaComponent extends BaseComponent implements OnInit {
  entity: any;
  idEntity = `ID${MODULE_PROJETO.name}`;
  entities: MatTableDataSource<any>;
  displayedColumns: string[] = ['IDProjeto', 'NRNome', 'DTInicioDTFim', 'NOTipoProjeto', 'actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() templateRef: TemplateRef<any>;

  constructor(
    private projetoService: ProjetoService,
    private router: Router,
    public dialog: MatDialog,
    public appSnackBarService: AppSnackBarService,
    public sepinService: SepinService,
  ) {
    super(appSnackBarService);
  }

  ngOnInit() {
    this.entity = {};
    this.recuperarLista();
    this.paginator._intl.itemsPerPageLabel = 'Registros por página';
    this.paginator._intl.nextPageLabel = 'Siguiente';
    this.paginator._intl.previousPageLabel = 'Anterior';
    this.paginator._intl.firstPageLabel = 'Primeira Página';
    this.paginator._intl.lastPageLabel = 'Última Página';
  }

  applyFilter(filterValue: string) {
    this.entities.filter = filterValue.trim().toLowerCase();
  }

  recuperarLista(): void {
    forkJoin(
      this.projetoService.fetchAll(),
      this.sepinService.fetchAll(MODULE_TIPO_PROJETO)
    ).subscribe(
      onNext => {
        const list = onNext[0];
        const types = onNext[1];
        const result = [];

        for (const element of list) {
          element.NOTipoProjeto = types.find(t => t.IDTipoProjeto === element.IDTipoProjeto).NRDescricao;
          result.push(element);
        }
        this.montarEntities(result);
      },
      onError => this.addSnackBar(AppMessages.getObj(MSG101))
    );
  }

  incluir(): void {
    this.router.navigate([URL_PROJETO_CADASTRO]);
  }

  preEdit(obj: any): void {
    this.router.navigate([URL_PROJETO_CADASTRO, obj[this.idEntity]]);
  }

  deleteRow(row: any) {
    const dataDialog: DeleteDialogData = { id: row[this.idEntity], title: 'Confirma a exclusão?', message: `Sigla: ${row.NRSigla}` };
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: dataDialog,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.delete) {
        this.sepinService.apagar(MODULE_PROJETO, row[this.idEntity]).subscribe(
          () => { },
          onError => {
            if (onError.error) {
              this.addSnackBar(AppMessages.getObjByMsg(onError.error.message, 'Erro'));
            } else {
              this.addSnackBar(AppMessages.getObj(MSG101));
            }
          },
          () => {
            this.addSnackBar(AppMessages.getObj(MSG002));
            this.recuperarLista();
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
