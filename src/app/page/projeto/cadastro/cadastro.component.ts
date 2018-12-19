import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProjetoService } from '../service/projeto.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppSnackBarService } from 'src/app/page/shared/utils/snackbar/app-snackbar.component';
import { BaseComponent } from '../../base.component';
import { AppMessages, MSG001, MSG101 } from 'src/app/page/shared/utils/app.messages';
import { Subscription, Observable } from 'rxjs';
import { SepinService } from 'src/app/page/shared/utils/service/sepin.service';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { NgForm, NgModel } from '@angular/forms';
import { map, find, tap, filter } from 'rxjs/operators';
import { MatDialog, MatStepper } from '@angular/material';
import { DialogRecursoHumanoComponent } from '../../dispendio/recurso-humano/dialog.recurso.humano.component';
import { DialogEquipamentoSoftwareComponent } from '../../dispendio/equipamento-software/dialog.equipamento.software.component';
import { forkJoin } from 'rxjs';

const MODULE_PROJETO = environment.moduleProjeto;
const MODULE_RECURSO_HUMANO = environment.moduleRecursoHumano;
const MODULE_EQUIPAMENTO_SOFTWARE = environment.moduleEquipamentoSoftware;
const MODULE_HIBRIDO_RH_PROJETO = { name: MODULE_RECURSO_HUMANO.name, id: 'IDProjeto' };
const MODULE_HIBRIDO_ES_PROJETO = { name: MODULE_EQUIPAMENTO_SOFTWARE.name, id: 'IDProjeto' };
const MODULE_TIPO_PROJETO = environment.moduleTipoProjeto;
const MODULE_AREA_APLICACAO = environment.moduleAreaAplicacao;
const URL_PROJETO = 'projeto';
@Component({
  selector: 'app-projeto-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
  providers: [ProjetoService, SepinService]
})
export class CadastroComponent extends BaseComponent implements OnInit, OnDestroy {
  activeForm = true;
  private subscription: Subscription;
  entity: any;
  idEntity = `ID${MODULE_PROJETO.name}`;
  // entityStep2: any;
  entities: any[];
  areaAplicacoes: any;
  types: any;
  currentAreaAplicacao: any;
  msgObrigatorio = AppMessages.getObj(MSG001);

  constructor(
    private projetoService: ProjetoService,
    private router: Router,
    private actionRoute: ActivatedRoute,
    private sepinService: SepinService,
    public appSnackBarService: AppSnackBarService,
    public dialog: MatDialog,
  ) {
    super(appSnackBarService);
  }

  ngOnInit() {
    // this.entity = {};
    this.entity = {
      DTAnoBase: moment().format('YYYY'),
      VLTotalValido: 0,
      VLEquipamentoSoftware: 0,
      VLLivroPeriodico: 0,
      VLMaterialConsumo: 0,
      VLObraCivil: 0,
      VLOuroCorrelato: 0,
      VLRecursosHumanoa: 0,
      VLServicoTerceiro: 0,
      VLTreinamento: 0,
      VLViagem: 0,
    };
    this.recuperarTodosTipoProjeto();
    this.recuperarTodasAreasAplicacao();
    this.subscription = this.actionRoute.params.subscribe(params => {
      if (params && params['id']) {
        this.fetchById(params['id']);
      } else {
        this.calcularTotalDispendio();
      }

      if (environment.isDevelope) {
        this.initForDevelop();
      }
    });
  }

  fetchById(id: any): any {
    this.sepinService.fetchById(MODULE_PROJETO, id).subscribe(
      onNext => {
        if (onNext && onNext.length > 0) {
          this.entity = onNext[0];
        }
      }, onError => {
        if (onError.error) {
          this.addSnackBar(AppMessages.getObjByMsg(onError.error.message, 'Erro'));
        } else {
          this.addSnackBar(AppMessages.getObj(MSG101));
        }
      }, () => {
        this.areaAplicacoes.subscribe(areas => {
          const areaAplicacao = areas.find(area => area.IDAreaAplicacao === this.entity.IDAreaAplicacao);
          if (areaAplicacao) {
            this.currentAreaAplicacao = `${areaAplicacao.CDCodigo} - ${areaAplicacao.NRNome}`;
          }
        });
        this.recuperarValoresDispendios();
      }
    );
  }

  recuperarTodosTipoProjeto(): void {
    this.types = this.sepinService.fetchAll(MODULE_TIPO_PROJETO);
  }

  recuperarTodasAreasAplicacao(): void {
    this.areaAplicacoes = this.sepinService.fetchAll(MODULE_AREA_APLICACAO);
    // this.sepinService.fetchAll(MODULE_AREA_APLICACAO).subscribe(
    //   onNext => {
    //     this.areaAplicacoes = onNext;
    //   }, onError => {
    //     if (onError.error) {
    //       this.addSnackBar(AppMessages.getObjByMsg(onError.error.message, 'Erro'));
    //     } else {
    //       this.addSnackBar(AppMessages.getObj(MSG101));
    //     }
    //   }, () => {
    //   }
    // );
  }

  recuperarValoresDispendios(): void {
    forkJoin(
      this.sepinService.fetchById(MODULE_HIBRIDO_RH_PROJETO, this.entity.IDProjeto),
      this.sepinService.fetchById(MODULE_HIBRIDO_ES_PROJETO, this.entity.IDProjeto),
    ).subscribe(
      onNext => {
        const rh = onNext[0];
        const es = onNext[1];
        const result = [];

        for (const r of rh) {
          this.entity.VLRecursosHumanoa += r.VLRecurso;
        }

        for (const e of es) {
          this.entity.VLEquipamentoSoftware += (e.VLDispendio + e.VLDepreciacao);
        }

      },
      onError => this.addSnackBar(AppMessages.getObj(MSG101)),
      () => {
        this.calcularTotalDispendio();
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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

    this.sepinService.salvarAndReturnId(MODULE_PROJETO, this.entity).subscribe(
      onNext => {
        this.entity[this.idEntity] = onNext.value;
      }, onError => {
        if (onError.error) {
          this.addSnackBar(AppMessages.getObjByMsg(onError.error.message, 'Erro'));
        } else {
          this.addSnackBar(AppMessages.getObj(MSG101));
        }
      }, () => {
        this.routerConsulta();
      }
    );
  }

  doFilterAreaAplicacao() {
    // if (this.currentAreaAplicacao.length === 0) {
    //   console.log(this.currentAreaAplicacao);
    //   this.entity.IDAreaAplicacao = null;
    // }
    // if (this.currentAreaAplicacao && this.currentAreaAplicacao.length >= 3) {
    // this.areaAplicacoes = this.sepinService.fetchAll(MODULE_AREA_APLICACAO)
    //   .pipe(
    //     map(values => this._filter(values)),
    //   );
    this.areaAplicacoes = this.areaAplicacoes.pipe(
      map(values => this._filter(values)),
    );
    // }
  }

  getStyleRadioCheck(form: NgForm, model: NgModel): any {
    if (form.invalid && form.submitted && !model.value) {
      return { 'padding-right': '10px', 'color': '#f44336' };

    }
    return {};
  }

  onChangeTipo(event: number): void {
    this.entity.CKArtigoI = false;
    this.entity.CKArtigoII = false;
    this.entity.CKArtigoIII = false;
    this.entity.CKArtigoIV = false;
    this.entity.CKArtigoIVA = false;
    this.entity.CKArtigoIVB = false;
    this.entity.CKArtigoIVC = false;
    this.entity.CKArtigoIV1 = false;
  }

  currencyInputChanged(value) {
    const num = value.replace(/[R][$]/, '').replace(/[+*?.,]/, '');
    return num;
  }

  calcularTotalDispendio(): void {
    const {
      VLEquipamentoSoftware,
      VLLivroPeriodico,
      VLMaterialConsumo,
      VLObraCivil,
      VLOuroCorrelato,
      VLRecursosHumanoa,
      VLServicoTerceiro,
      VLTreinamento,
      VLViagem } = this.entity;

    this.entity.VLTotalValido = VLEquipamentoSoftware +
      VLLivroPeriodico +
      VLMaterialConsumo +
      VLObraCivil +
      VLOuroCorrelato +
      VLRecursosHumanoa +
      VLServicoTerceiro +
      VLTreinamento +
      VLViagem;
  }

  openDialogRecursoHumano(): void {
    const data = { name: 'IDProjeto', id: this.entity.IDProjeto };
    const dialogRef = this.dialog.open(DialogRecursoHumanoComponent, { width: '90%', height: '90%', data });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.dados) {
        this.entity.VLRecursosHumanoa = 0;
        for (const e of result.dados) {
          this.entity.VLRecursosHumanoa += e.VLRecurso;
        }
        this.calcularTotalDispendio();
        //   this.entity.IDEstrangeiro = result.id;
        //   this.entity.NRNomeColaborador = result.name;
      }
    });
  }

  openDialogEquipamentoSoftware(): void {
    const data = { name: 'IDProjeto', id: this.entity.IDProjeto, idTipoProjeto: this.entity.IDTipoProjeto };
    const dialogRef = this.dialog.open(DialogEquipamentoSoftwareComponent, { width: '90%', height: '90%', data });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result && result.dados) {
        this.entity.VLEquipamentoSoftware = 0;
        for (const e of result.dados) {
          this.entity.VLEquipamentoSoftware += (e.VLDispendio + e.VLDepreciacao);
        }
        this.calcularTotalDispendio();
        //   this.entity.IDEstrangeiro = result.id;
        //   this.entity.NRNomeColaborador = result.name;
      }
    });
  }

  voltar(stepper: MatStepper) {
    stepper.previous();
  }

  irPaginaDispendio(stepper: MatStepper, form: NgForm) {
    event.preventDefault();
    if (!form.valid) {
      this.addSnackBar(AppMessages.getObj(MSG001));
      return;
    }
    this.sepinService.salvarAndReturnId(MODULE_PROJETO, this.entity).subscribe(
      onNext => {
        this.entity[this.idEntity] = onNext.value;
      }, onError => {
        if (onError.error) {
          this.addSnackBar(AppMessages.getObjByMsg(onError.error.message, 'Erro'));
        } else {
          this.addSnackBar(AppMessages.getObj(MSG101));
        }
      }, () => {
        stepper.next();
      }
    );
  }

  irPaginaDescricao(stepper: MatStepper) {
    event.preventDefault();
    this.sepinService.salvarAndReturnId(MODULE_PROJETO, this.entity).subscribe(
      onNext => {
        this.entity[this.idEntity] = onNext.value;
      }, onError => {
        if (onError.error) {
          this.addSnackBar(AppMessages.getObjByMsg(onError.error.message, 'Erro'));
        } else {
          this.addSnackBar(AppMessages.getObj(MSG101));
        }
      }, () => {
        stepper.next();
      }
    );
  }

  onChangeStepper(event: any, stepper: MatStepper): void {
    // console.log(event);
    // console.log(stepper);
    // stepper.selectedIndex = 0;
  }

  private _filter(values) {
    return values.filter(obj => {
      if (obj.NRNome.toLowerCase().includes(this.currentAreaAplicacao.toLocaleLowerCase())) {
        return true;
      } else if (obj.CDCodigo.toString().toLowerCase().includes(this.currentAreaAplicacao.toLocaleLowerCase())) {
        return true;
      }
      return false;
    });
  }

  initForDevelop() {
    this.entity = {
      // module: MODULE_PROJETO.name,
      IDTipoProjeto: 4,
      // NRIdentificado: 'IDE2',
      NRSigla: 'test',
      NRNome: 'teste desenvolvimento',
      NREspecificador: 'específico',
      DTInicio: new Date(),
      DTFim: new Date(),
      BLTrocaPPBparaPD: 'sim',
      NRAlcance: 'Exportação',
      NRGrauInovacaoG1: 'Novo no mercado Mundial',
      NRGrauInovacaoG2: 'Desenvolvimento de algo novo',
      IDAreaAplicacao: 3,
      BLPropriedadeIntelectual: 'sim',
      BLPublicacao: 'sim',
      QDQuantidadePublicacao: 5,
      CKArtigoI: false,
      CKArtigoII: false,
      CKArtigoIII: true,
      CKArtigoIV: false,
      CKArtigoIVA: false,
      CKArtigoIVB: false,
      CKArtigoIVC: false,
      CKArtigoIV1: false,

      // tslint:disable-next-line:max-line-length
      DSObjetivo: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex',
      // tslint:disable-next-line:max-line-length
      DSDescricaoEtapa: 'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally',
      // tslint:disable-next-line:max-line-length
      DSResultadoObtido: 'Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular. Li lingues differe solmen in li grammatica, li pronunciation e li plu commun vocabules. Omnicos directe al desirabilite de un nov lingua franca: On refusa continuar payar custosi traductores. At solmen va esser necessi far uniform grammatica, pronunciation e plu sommun paroles. Ma quande lingues coalesce, li grammatica del resultant lingue es plu simplic e regulari quam ti del coalescent lingues. Li nov lingua franca va esser plu simplic e regulari quam li existent Europan',
    };

    // this.entityStep2 = {
    //   module: MODULE_PROJETO_DISPENDIO.name,
    //   DTAnoBase: moment().format('YYYY'),
    //   VLRecursosHumanoa: 51,
    //   VLTreinamento: 51,
    //   VLEquipamentoSoftware: 51,
    //   VLLivroPeriodico: 51,
    //   VLObraCivil: 51,
    //   VLViagem: 51,
    //   VLMaterialConsumo: 51,
    //   VLOuroCorrelato: 51,
    //   VLServicoTerceiro: 51,
    //   // VLTotalValido: 51,
    // };
  }
}
