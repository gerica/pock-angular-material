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
import { MatDialog, MatDialogRef, MatTableDataSource, MatPaginator, MatSort, MAT_DIALOG_DATA } from '@angular/material';
import { DialogEstrangeiroComponent } from './dialog.estrangeiro.component';
import { forkJoin } from 'rxjs';
import { DeleteDialogData, DeleteDialogComponent } from '../../shared/utils/modal/delete/delete.dialog.component';
import { DialogRHVisualizarComponent } from './dialog.rh.visualizar.component';

const MODULE_RECURSO_HUMANO = environment.moduleRecursoHumano;
const MODULE_TIPO_DISPENDIO = environment.moduleTipoDispendio;
const MODULE_TIPO_DISPENDIO_RH = { name: environment.moduleTipoDispendio.name, id: 'TPDispendio' };
const MODULE_ESCOLARIDADE = environment.moduleEscolaridade;
const MODULE_FORMACAO = environment.moduleFormacao;
const URL_PROJETO = 'recurso-humano';
const MODULE_HIBRIDO_RH_PROJETO = { name: MODULE_RECURSO_HUMANO.name, id: 'IDProjeto' };
const MODULE_ESTRANGEIRO = environment.moduleEstrangeiro;

@Component({
  selector: 'app-recurso-humano-dialog',
  templateUrl: './dialog.recurso.humano.component.html',
  styleUrls: ['./dialog.recurso.humano.component.scss'],
  providers: [SepinService]
})
export class DialogRecursoHumanoComponent extends BaseComponent implements OnInit {
  title = 'Cadastro';
  dispendios: Observable<any>;
  naoPossuiCPF = false;
  activeForm = true;
  idEntity = `ID${MODULE_RECURSO_HUMANO.name}`;
  entity: any;
  areaAplicacoes: any;
  instituincoes: any;
  types: any;
  currentAreaAplicacao: any;
  NRNomeColaborador: any;
  escolaridades: Observable<any>;
  formacoes: Observable<any>;
  estrangeiros: Observable<any>;
  maskCPF = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  msgObrigatorio = AppMessages.getObj(MSG001);
  entities: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'NOTipoDispendio',
    'NREstrangeiro',
    'NOEscolaridade',
    'NOFormacao',
    'DTInicioDTFim',
    'NRHorasTrabalhadas',
    'VLRecurso',
    'actions'
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialogRef: MatDialogRef<DialogRecursoHumanoComponent>,
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
    this.montarEscolaridades();
    this.montarFormacoes();
    this.montarEstrangeiros();
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

  recuperaTodosPorProjeto(): any {

    forkJoin(
      this.sepinService.fetchById(MODULE_HIBRIDO_RH_PROJETO, this.data.id),
      this.dispendios,
      this.estrangeiros,
      this.escolaridades,
      this.formacoes,
    ).subscribe(
      onNext => {
        const list = onNext[0];
        const dispendios = onNext[1];
        const estrangeiros = onNext[2];
        const escolaridades = onNext[3];
        const formacoes = onNext[4];

        const result = [];

        list.forEach(element => {
          element.NOTipoDispendio = dispendios.find(d => d.CDTipoDispendio === element.CDTipoDispendio).NOTipoDispendio;
          element.NREstrangeiro = estrangeiros.find(e => e.IDEstrangeiro === element.IDEstrangeiro).NRNome;
          element.NOEscolaridade = escolaridades.find(e => e.CDEscolaridade === element.CDEscolaridade).NOEscolaridade;
          element.NOFormacao = formacoes.find(e => e.CDFormacao === element.CDFormacao).NOFormacao;
          result.push(element);
        });
        this.montarEntities(result);
      },
      onError => this.addSnackBar(AppMessages.getObj(MSG101))
    );

  }

  fetchById(): any {
    this.sepinService.fetchById(MODULE_HIBRIDO_RH_PROJETO, this.data.id).subscribe(
      onNext => {
        if (onNext && onNext.length > 0) {
          this.entities = onNext[0];
        }
      }, onError => {
        if (onError.error) {
          this.addSnackBar(AppMessages.getObjByMsg(onError.error.message, 'Erro'));
        } else {
          this.addSnackBar(AppMessages.getObj(MSG101));
        }
      }, () => {
      }
    );
  }

  montarDispendios(): void {
    this.dispendios = this.sepinService.fetchById(MODULE_TIPO_DISPENDIO_RH, 1);
  }

  montarEscolaridades(): void {
    this.escolaridades = this.sepinService.fetchAll(MODULE_ESCOLARIDADE);
  }

  montarFormacoes(): void {
    this.formacoes = this.sepinService.fetchAll(MODULE_FORMACAO);
  }

  montarEstrangeiros(): void {
    this.estrangeiros = this.sepinService.fetchAll(MODULE_ESTRANGEIRO);
  }

  routerConsulta(): void {
    this.router.navigate([URL_PROJETO]);
  }

  gravar(event: any, form1: any): void {
    event.preventDefault();
    if (!form1.valid) {
      this.addSnackBar(AppMessages.getObj(MSG001));
      return;
    }

    this.entity[this.data.name] = this.data.id;

    delete this.entity.NOEscolaridade;
    delete this.entity.NOFormacao;
    delete this.entity.NOTipoDispendio;
    delete this.entity.NREstrangeiro;

    this.entity.DTInicioAtuacao = moment(this.entity.DTInicioAtuacao).toDate();
    this.entity.DTFinalAtuacao = moment(this.entity.DTFinalAtuacao).toDate();

    this.sepinService.salvar(MODULE_RECURSO_HUMANO, this.entity).subscribe(
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
    this.NRNomeColaborador = undefined;
    this.naoPossuiCPF = false;
    this.activeForm = false;
    setTimeout(() => this.activeForm = true, 0);
  }

  limparCPF(): void {
    delete this.entity.NRCPFColaborador;
    delete this.NRNomeColaborador;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogEstrangeiroComponent, { width: '40%', });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.name) {
        this.entity.IDEstrangeiro = result.id;
        this.NRNomeColaborador = result.name;
      }
    });
  }

  fechar(): void {
    this.dialogRef.close();
  }

  preEdit(row: any): void {
    this.estrangeiros.subscribe(
      onNext => {
        const objEstrangeiro = onNext.find(e => e.IDEstrangeiro === row.IDEstrangeiro);
        if (objEstrangeiro) {
          this.NRNomeColaborador = objEstrangeiro.NRNome;
        }
      },
      onError => {
        if (onError.error) {
          this.addSnackBar(AppMessages.getObjByMsg(onError.error.message, 'Erro'));
        } else {
          this.addSnackBar(AppMessages.getObj(MSG101));
        }
      }, () => {
        this.entity = Object.assign({}, row);
        this.naoPossuiCPF = row.IDEstrangeiro ? true : false;
      }
    );

  }

  deleteRow(row: any) {
    const dataDialog: DeleteDialogData = { id: row[this.idEntity], title: 'Confirma a exclusão?', message: `Sigla: ${row.NRSigla}` };
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: dataDialog,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.delete) {
        this.sepinService.apagar(MODULE_RECURSO_HUMANO, row[this.idEntity]).subscribe(
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
    this.dialog.open(DialogRHVisualizarComponent, {
      height: '50%',
      width: '50%',
      data: row,
    });
  }

  private montarEntities(onNext: any) {
    this.entities = new MatTableDataSource<any>(onNext);
    this.entities.paginator = this.paginator;
    this.entities.sort = this.sort;
  }

  concluir(): void {
    this.dialogRef.close({ dados: this.entities.data });
  }

  initForDevelop() {
    this.entity = {};
  }
}
