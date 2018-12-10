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

const MODULE_TIPO_PROJETO = environment.moduleTipoProjeto;
const URL_PROJETO_CADASTRO = 'projeto/cadastro';
@Component({
  selector: 'app-projeto-lista',
  templateUrl: './projeto.component.html',
  styleUrls: ['./projeto.component.scss'],
  providers: [ProjetoService, SepinService]
})
export class ProjetoListaComponent extends BaseComponent implements OnInit {
  entity: any;
  types: any[];
  entities: MatTableDataSource<any>;
  displayedColumns: string[] = ['NRIdentificado', 'NRNome', 'DTInicioDTFim', 'TipoProjeto', 'actions'];
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
    this.recuperarTodosTipoProjeto();
    this.paginator._intl.itemsPerPageLabel = 'Registros por página';
    this.paginator._intl.nextPageLabel = 'Siguiente';
    this.paginator._intl.previousPageLabel = 'Anterior';
    this.paginator._intl.firstPageLabel = 'Primeira Página';
    this.paginator._intl.lastPageLabel = 'Última Página';
  }

  applyFilter(filterValue: string) {
    this.entities.filter = filterValue.trim().toLowerCase();
  }

  consultar(): void {
    this.projetoService.fetchAll().subscribe(
      onNext => {
        this.montarEntities(onNext);
      }, onError => {
        this.addSnackBar(AppMessages.getObj(MSG100));
      }, () => {
      }
    );
  }

  recuperarTodosTipoProjeto(): void {
    this.sepinService.fetchAll(MODULE_TIPO_PROJETO).subscribe(
      onNext => {
        this.types = onNext;
      }, onError => {
        if (onError.error) {
          this.addSnackBar(AppMessages.getObjByMsg(onError.error.message, 'Erro'));
        } else {
          this.addSnackBar(AppMessages.getObj(MSG101));
        }
      }, () => {
        this.consultar();
      }
    );
  }

  incluir(): void {
    this.router.navigate([URL_PROJETO_CADASTRO]);
  }

  preEdit(obj: any): void {
    this.router.navigate([URL_PROJETO_CADASTRO, obj.IDProjeto]);
  }

  deleteRow(row: any) {
    const dataDialog: DeleteDialogData = { id: row.IDProjeto, title: 'Confirma a exclusão?', message: `Sigla: ${row.NRSigla}` };
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: dataDialog,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.delete) {
        this.projetoService.apagar(row.IDProjeto).subscribe(
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

  getTipoDescricao(element: any): String {
    if (!this.types || this.types.length === 0) {
      return '';
    }
    const type = this.types.find(t => t.IDTipoProjeto === element.IDTipoProjeto);
    if (type) {
      return type.NRDescricao;
    }
    return '';
  }

  private montarEntities(onNext: any) {
    this.entities = new MatTableDataSource<any>(onNext);
    this.entities.paginator = this.paginator;
    this.entities.sort = this.sort;
  }

}
