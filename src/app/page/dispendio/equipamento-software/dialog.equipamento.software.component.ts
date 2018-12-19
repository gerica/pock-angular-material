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
import { DeleteDialogData, DeleteDialogComponent } from '../../shared/utils/modal/delete/delete.dialog.component';

const MODULE_EQUIPAMENTO_SOFTWARE = environment.moduleEquipamentoSoftware;
const MODULE_TIPO_APROPRIACAO = environment.moduleTipoApropriacao;
const MODULE_TIPO_DISPENDIO_RH = { name: environment.moduleTipoDispendio.name, id: 'TPDispendio' };
const MODULE_HIBRIDO_ES_PROJETO = { name: MODULE_EQUIPAMENTO_SOFTWARE.name, id: 'IDProjeto' };

const TYPE_FILE = 'text/csv';
@Component({
  selector: 'app-equipamento-software-dialog',
  templateUrl: './dialog.equipamento.software.component.html',
  styleUrls: ['./dialog.equipamento.software.component.scss'],
  providers: [SepinService]
})
export class DialogEquipamentoSoftwareComponent extends BaseComponent implements OnInit {
  title = 'Cadastro';
  dispendios: Observable<any>;
  apropriacoes: Observable<any>;
  activeForm = true;

  idEntity = `ID${MODULE_EQUIPAMENTO_SOFTWARE.name}`;
  entity: any;

  msgObrigatorio = AppMessages.getObj(MSG001);
  entities: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'NOTipoDispendio',
    'NOTipoApropriacao',
    'VLDispendio',
    'VLDepreciacao',
    'DTAquisicao',

    'actions'
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  indexTab = 0;
  fileName: String;
  fileToImport: any;

  constructor(
    public dialogRef: MatDialogRef<DialogEquipamentoSoftwareComponent>,
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
    this.montarDispendios();
    this.recuperaTodosPorProjeto();
    this.montarApropriacoes();
    if (environment.isDevelope) {
      this.initForDevelop();
    }

    this.paginator._intl.itemsPerPageLabel = 'Registros por página';
    this.paginator._intl.nextPageLabel = 'Siguiente';
    this.paginator._intl.previousPageLabel = 'Anterior';
    this.paginator._intl.firstPageLabel = 'Primeira Página';
    this.paginator._intl.lastPageLabel = 'Última Página';
  }

  recuperaTodosPorProjeto(): any {

    forkJoin(
      this.sepinService.fetchById(MODULE_HIBRIDO_ES_PROJETO, this.data.id),
      this.dispendios,
    ).subscribe(
      onNext => {
        const list = onNext[0];
        const dispendios = onNext[1];
        const result = [];

        list.forEach(element => {
          element.NOTipoDispendio = dispendios.find(d => d.CDTipoDispendio === element.CDTipoDispendio).NOTipoDispendio;
          result.push(element);
        });
        this.montarEntities(result);
      },
      onError => this.addSnackBar(AppMessages.getObj(MSG101))
    );

  }

  montarDispendios(): void {
    this.dispendios = this.sepinService.fetchById(MODULE_TIPO_DISPENDIO_RH, 2);
  }

  montarApropriacoes(): void {
    this.apropriacoes = this.sepinService.fetchAll(MODULE_TIPO_APROPRIACAO);
  }

  gravar(event: any, form1: any): void {
    event.preventDefault();
    if (!form1.valid) {
      this.addSnackBar(AppMessages.getObj(MSG001));
      return;
    }

    this.entity[this.data.name] = this.data.id;

    delete this.entity.NOTipoDispendio;

    this.entity.DTAquisicao = moment(this.entity.DTAquisicao).toDate();

    this.sepinService.salvar(MODULE_EQUIPAMENTO_SOFTWARE, this.entity).subscribe(
      () => {
      }, onError => {
        if (onError.error) {
          this.addSnackBar(AppMessages.getObjByMsg(onError.error.message, 'Erro'));
        } else {
          this.addSnackBar(AppMessages.getObj(MSG101));
        }
      }, () => {
        this.addSnackBar(AppMessages.getObj(MSG002));
        this.novo();
        this.recuperaTodosPorProjeto();
        // this.routerConsulta();
      }
    );
  }

  novo(): void {
    this.entity = {};
    this.activeForm = false;
    setTimeout(() => this.activeForm = true, 0);
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
        this.sepinService.apagar(MODULE_EQUIPAMENTO_SOFTWARE, row[this.idEntity]).subscribe(
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
    this.dialogRef.close({ dados: this.entities.data });
  }

  fechar(): void {
    this.dialogRef.close();
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.indexTab = tabChangeEvent.index;
  }

  importar(event: Event, form: NgForm): void {
    event.preventDefault();
    if (!form.valid) {
      this.addSnackBar(AppMessages.getObj(MSG001));
      return;
    }
    console.log('importar');


    if (this.fileToImport) {
      const reader = new FileReader();
      reader.readAsDataURL(this.fileToImport);
      reader.onload = () => {

      };
    }
  }

  onFileChange(event) {

    if (event.target.files && event.target.files.length) {

      const temp = event.target.files[0];
      if (temp.type === TYPE_FILE) {
        this.fileToImport = event.target.files[0];
        console.log(this.fileToImport);
        this.fileName = this.fileToImport.name;
      } else {
        this.addSnackBar({ id: MSG001, msg: 'Selecione um arquivo do tipo CSV.', type: 'Alerta' });
      }
    }
  }

  initForDevelop() {
    this.entity = {};
  }

  private montarEntities(onNext: any) {
    this.entities = new MatTableDataSource<any>(onNext);
    this.entities.paginator = this.paginator;
    this.entities.sort = this.sort;
  }
}
