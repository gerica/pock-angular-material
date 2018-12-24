import { Component, OnInit, OnDestroy, ViewChild, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppSnackBarService } from 'src/app/page/shared/utils/snackbar/app-snackbar.component';
import { AppMessages, MSG001, MSG101, MSG002 } from 'src/app/page/shared/utils/app.messages';
import { Observable } from 'rxjs';
import { SepinService } from 'src/app/page/shared/utils/service/sepin.service';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { NgForm, NgModel } from '@angular/forms';
import { map, switchMap, } from 'rxjs/operators';
import { BaseComponent } from 'src/app/page/base.component';
import { MatDialog, MatDialogRef, MatTableDataSource, MatPaginator, MatSort, MAT_DIALOG_DATA, MatTabChangeEvent } from '@angular/material';
import { forkJoin } from 'rxjs';
import { DeleteDialogData, DeleteDialogComponent } from '../shared/utils/modal/delete/delete.dialog.component';

const MODULE_PRORIEDADE_INTELECTUAL = environment.modulePropriedadeIntelectual;
const MODULE_HB_PROJETO_PROPRIEDADE_INTELECTUAL = {
  name: environment.moduleProjetoPropriedadeIntelectual.name,
  id: `ID${environment.moduleProjeto.name}`
};

const TYPE_FILE = 'text/csv';
@Component({
  selector: 'app-propriedade-intelectual-dialog',
  templateUrl: './dialog.propriedade.intelectual.html',
  styleUrls: ['./dialog.propriedade.intelectual.scss'],
  providers: [SepinService]
})
export class DialogPropriedadeIntelectualComponent extends BaseComponent implements OnInit {
  title = 'Cadastro';
  activeForm = true;
  tipos: any;
  situacoes: any;
  locais: any;
  idEntity = `ID${MODULE_PRORIEDADE_INTELECTUAL.name}`;
  entity: any;
  entitiesCheckeds: any = [];
  listEnitiesCheck: any = [];
  msgObrigatorio = AppMessages.getObj(MSG001);
  entities: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'check',
    'NRDescricao',
    'NRTipoPropriedadeIntelectual',
    'NRRegistroPedido',
    'DTPedido',
    'NRLocal',
    'actions'
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  propriedades: any;

  constructor(
    public dialogRef: MatDialogRef<DialogPropriedadeIntelectualComponent>,
    private router: Router,
    private actionRoute: ActivatedRoute,
    private sepinService: SepinService,
    public appSnackBarService: AppSnackBarService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    super(appSnackBarService);
  }

  ngOnInit() {
    this.entity = {};
    this.montarTipo();
    this.montarSituacoes();
    this.montarLocais();
    this.recuperaTodosPorProjeto();
    if (environment.isDevelope) {
      this.initForDevelop();
    }

    this.paginator._intl.itemsPerPageLabel = 'Registros por página';
    this.paginator._intl.nextPageLabel = 'Siguiente';
    this.paginator._intl.previousPageLabel = 'Anterior';
    this.paginator._intl.firstPageLabel = 'Primeira Página';
    this.paginator._intl.lastPageLabel = 'Última Página';
  }

  montarTipo(): void {
    this.tipos = [
      { id: 'Patente', value: 'Patente' },
      { id: 'Direitos autorais', value: 'Direitos autorais' },
    ];
  }

  montarSituacoes(): void {
    this.situacoes = [
      { id: 'Pedido', value: 'Pedido' },
      { id: 'Concedido', value: 'Concedido' },
    ];
  }

  montarLocais(): void {
    this.locais = [
      { id: 'Brasil', value: 'Brasil' },
      { id: 'Argentina', value: 'Argentina' },
      { id: 'Peru', value: 'Peru' },
      { id: 'Chile', value: 'Peru' },
    ];
  }

  recuperaTodosPorProjeto(): any {

    forkJoin(
      this.sepinService.fetchAll(MODULE_PRORIEDADE_INTELECTUAL),
      this.sepinService.fetchById(MODULE_HB_PROJETO_PROPRIEDADE_INTELECTUAL, this.data.id),
      // this.sepinService.fetchById(MODULE_TIPO_DISPENDIO_RH, 2),
      // this.sepinService.fetchAll(MODULE_TIPO_APROPRIACAO),
    ).subscribe(
      onNext => {
        const list = onNext[0];
        this.propriedades = onNext[1];

        if (this.propriedades && this.propriedades.length > 0) {
          this.propriedades.forEach(e => {
            this.listEnitiesCheck.push(e);
          });
        }
        // this.apropriacoes = onNext[2];
        // const result = [];

        // for (const element of list) {
        //   result.push(element);
        // }
        // console.log(this.entitiesCheckeds);
        // console.log(this.propriedades);
        this.montarEntities(list);
      },
      onError => this.addSnackBar(AppMessages.getObj(MSG101))
    );

  }

  gravar(event: any, form1: any): void {
    event.preventDefault();
    if (!form1.valid) {
      this.addSnackBar(AppMessages.getObj(MSG001));
      return;
    }
    const fnSuccess = () => {
      this.addSnackBar(AppMessages.getObj(MSG002));
      this.novo();
      this.recuperaTodosPorProjeto();
    };
    this.saveEntity(fnSuccess);
  }

  preEdit(row: any): void {
    this.entity = Object.assign({}, row);
  }

  deleteRow(row: any) {
    const dataDialog: DeleteDialogData = { id: row[this.idEntity], title: 'Confirma a exclusão?', message: `Sigla: ${row.NRSigla}` };
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: dataDialog,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.delete) {
        this.sepinService.apagar(MODULE_PRORIEDADE_INTELECTUAL, row[this.idEntity]).subscribe(
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
            this.recuperaTodosPorProjeto();
          }
        );
      }
    });
  }

  visualizar(row: any): void {
    // this.dialog.open(DialogRHVisualizarComponent, {
    //   height: '50%',
    //   width: '50%',
    //   data: row,
    // });
  }

  concluir(): void {
    this.dialogRef.close({ dados: this.listEnitiesCheck });
  }

  fechar(): void {
    this.dialogRef.close();
  }

  private saveEntity(callBackSucess: any) {
    // this.entity[this.data.name] = this.data.id;

    // delete this.entity.NOTipoDispendio;
    // delete this.entity.NOTipoApropriacao;

    this.entity.DTPedido = moment(this.entity.DTPedido).toDate();

    this.sepinService.salvar(MODULE_PRORIEDADE_INTELECTUAL, this.entity).subscribe(() => {
    }, onError => {
      if (onError.error) {
        this.addSnackBar(AppMessages.getObjByMsg(onError.error.message, 'Erro'));
      } else {
        this.addSnackBar(AppMessages.getObj(MSG101));
      }
    }, callBackSucess);
  }

  novo(): void {
    this.entity = {};
    this.activeForm = false;
    setTimeout(() => this.activeForm = true, 0);
  }

  toogleCheckList(row: any): void {
    const index = this.listEnitiesCheck.findIndex(e => e.IDPropriedadeIntelectual === row.IDPropriedadeIntelectual);
    if (index === -1) {
      this.listEnitiesCheck.push(row);
    } else {
      this.listEnitiesCheck.splice(index, 1);
    }
  }

  initForDevelop() {
    this.entity = {};
  }

  getRowChecked(row: any): boolean {
    if (this.propriedades && this.propriedades.length > 0) {
      const checked = this.propriedades.find(e => e.IDPropriedadeIntelectual === row.IDPropriedadeIntelectual);
      return checked ? true : false;
    }
    return false;
  }

  private montarEntities(onNext: any) {
    this.entities = new MatTableDataSource<any>(onNext);
    this.entities.paginator = this.paginator;
    this.entities.sort = this.sort;
  }

}
