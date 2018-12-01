import { Component, OnInit, ViewChild, TemplateRef, Input } from '@angular/core';
import { ProjetoService } from '../service/projeto.service';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort, Sort, MatDialog } from '@angular/material';
import { DeleteDialogComponent, DeleteDialogData } from 'src/app/page/shared/utils/modal/delete/delete.dialog.component';
import { AppSnackBarService } from 'src/app/page/shared/utils/snackbar/app-snackbar.component';
import { BaseComponent } from '../../base.component';
import { AppMessages, MSG100, MSG002, MSG101, AppMessage } from 'src/app/page/shared/utils/app.messages';

@Component({
  selector: 'app-projeto-lista',
  templateUrl: './projeto.component.html',
  styleUrls: ['./projeto.component.scss'],
  providers: [ProjetoService]
})
export class ProjetoListaComponent extends BaseComponent implements OnInit {
  entity: any;
  entities: MatTableDataSource<any>;
  displayedColumns: string[] = ['IDProjeto', 'NRIdentificado', 'NRSigla', 'NRNome', 'actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() templateRef: TemplateRef<any>;

  constructor(
    private projetoService: ProjetoService,
    private router: Router,
    public dialog: MatDialog,
    public appSnackBarService: AppSnackBarService,
  ) {
    super(appSnackBarService);
  }

  ngOnInit() {
    this.entity = {};
    this.consultar();
    this.paginator._intl.itemsPerPageLabel = 'Registros por página';
    this.paginator._intl.nextPageLabel = 'Siguiente';
    this.paginator._intl.previousPageLabel = 'Anterior';
    this.paginator._intl.firstPageLabel = 'Primeira Página';
    this.paginator._intl.lastPageLabel = 'Última Página';
  }

  consultar(): void {
    this.projetoService.fetchAll().subscribe(
      onNext => {
        this.montarEntities(onNext);
        // this.entities = onNext;
      }, onError => {
        this.addSnackBar(AppMessages.getObj(MSG100));
      }, () => {
      }
    );
  }

  private montarEntities(onNext: any) {
    this.entities = new MatTableDataSource<any>(onNext);
    this.entities.paginator = this.paginator;
    this.entities.sort = this.sort;
  }

  incluir(): void {
    this.router.navigate(['/cadastro_projeto']);
  }

  preEdit(obj: any): void {
    console.log(obj);
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
              const custom: AppMessage = { id: 'CUSTOM', msg: onError.error.message, type: 'Erro' };
              this.addSnackBar(custom);
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

}
