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
import { FormControl, NgForm, NgModel } from '@angular/forms';
import { map, find, tap, filter } from 'rxjs/operators';

const MODULE_PROJETO_CONVENIADO = environment.moduleProjetoConveniado;
const MODULE_TIPO_PROJETO = environment.moduleTipoProjeto;
const MODULE_AREA_APLICACAO = environment.moduleAreaAplicacao;
const MODULE_INSTITUICOES = environment.moduleInstituicao;
const URL_PROJETO = 'conveniado';
@Component({
  selector: 'app-conveniado-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
  providers: [SepinService]
})
export class CadastroComponent extends BaseComponent implements OnInit, OnDestroy {
  activeForm = true;
  private subscription: Subscription;
  entity: any;
  areaAplicacoes: any;
  instituincoes: any;
  types: any;
  currentAreaAplicacao: any;
  regioes: any;
  maskTelefone = ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  msgObrigatorio = AppMessages.getObj(MSG001);

  constructor(
    private router: Router,
    private actionRoute: ActivatedRoute,
    private sepinService: SepinService,
    public appSnackBarService: AppSnackBarService,
  ) {
    super(appSnackBarService);
  }

  ngOnInit() {
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
      VLCustoInstituicao: 0,
      VLTotalRepassadoInstituicao: 0,
      VLAntecipadoProximoAno: 0,
      VLAntecipadoAnoAnterior: 0,
      VLTotalDispendio: 0,
      VLTotalDemaisCustos: 0,
    };
    this.recuperarTodosTipoProjeto();
    this.recuperarTodasAreasAplicacao();
    this.recuperarRegioes();
    this.recuperarTodasInstituicoes();
    this.subscription = this.actionRoute.params.subscribe(params => {
      if (params && params['id']) {
        this.fetchById(params['id']);
      } else {
        this.calcularTotalDispendioProprio();
        this.calcularTotalDispendioRepassado();
        this.calcularTotalDemaisCustosRepassado();
      }

      if (environment.isDevelope) {
        this.initForDevelop();
        this.calcularTotalDispendioProprio();
        this.calcularTotalDispendioRepassado();
        this.calcularTotalDemaisCustosRepassado();
      }
    });
  }

  fetchById(id: any): any {
    this.sepinService.fetchById(MODULE_PROJETO_CONVENIADO, id).subscribe(
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
        this.calcularTotalDispendioProprio();
        this.calcularTotalDispendioRepassado();
        this.calcularTotalDemaisCustosRepassado();
        // console.log(this.entity);
        // const keys = Object.keys(this.entity);
        // console.log(keys);
      }
    );
  }

  recuperarTodosTipoProjeto(): void {
    this.types = this.sepinService.fetchAll(MODULE_TIPO_PROJETO);
  }

  recuperarTodasAreasAplicacao(): void {
    this.areaAplicacoes = this.sepinService.fetchAll(MODULE_AREA_APLICACAO);
  }

  recuperarTodasInstituicoes(): void {
    this.instituincoes = this.sepinService.fetchAll(MODULE_INSTITUICOES);
  }

  recuperarRegioes(): void {
    this.regioes = [
      { value: 'SUDAM' },
      { value: 'SUDENE' },
      { value: 'CENTRO-OESTE' },
      { value: 'Demais regiões' }
    ];
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  routerConsulta(): void {
    this.router.navigate([URL_PROJETO]);
  }

  gravar(event: any, form1: any, form2: any): void {
    event.preventDefault();
    if (!form1.valid || !form2.valid) {
      this.addSnackBar(AppMessages.getObj(MSG001));
      return;
    }

    this.sepinService.salvar(MODULE_PROJETO_CONVENIADO, this.entity).subscribe(
      () => {
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

  calcularTotalDispendioRepassado(): void {
    const {
      VLRepassadoEquipamentoSoftware,
      VLRepassadoLivroPeriodico,
      VLRepassadoMaterialConsumo,
      VLRepassadoObraCivil,
      VLRepassadoOuroCorrelato,
      VLRepassadoRecursosHumanoa,
      VLRepassadoServicoTerceiro,
      VLRepassadoTreinamento,
      VLRepassadoViagem } = this.entity;

    this.entity.VLRepassadoTotalDispendio = VLRepassadoEquipamentoSoftware +
      VLRepassadoLivroPeriodico +
      VLRepassadoMaterialConsumo +
      VLRepassadoObraCivil +
      VLRepassadoOuroCorrelato +
      VLRepassadoRecursosHumanoa +
      VLRepassadoServicoTerceiro +
      VLRepassadoTreinamento +
      VLRepassadoViagem;
    this.calcularTotalValidoRepassado();
  }

  calcularTotalDispendioProprio(): void {
    const {
      VLProprioEquipamentoSoftware,
      VLProprioLivroPeriodico,
      VLProprioMaterialConsumo,
      VLProprioObraCivil,
      VLProprioOuroCorrelato,
      VLProprioRecursosHumanoa,
      VLProprioServicoTerceiro,
      VLProprioTreinamento,
      VLProprioViagem } = this.entity;

    this.entity.VLProprioTotalValido = VLProprioEquipamentoSoftware +
      VLProprioLivroPeriodico +
      VLProprioMaterialConsumo +
      VLProprioObraCivil +
      VLProprioOuroCorrelato +
      VLProprioRecursosHumanoa +
      VLProprioServicoTerceiro +
      VLProprioTreinamento +
      VLProprioViagem;
  }

  calcularTotalDemaisCustosRepassado(): void {
    const {
      VLRepassadoCustoInstituicao,
      VLRepassadoTotalRepassadoInstituicao,
      VLRepassadoAntecipadoProximoAno,
      VLRepassadoAntecipadoAnoAnterior
    } = this.entity;

    this.entity.VLRepassadoTotalDemaisCustos = VLRepassadoCustoInstituicao +
      VLRepassadoTotalRepassadoInstituicao +
      VLRepassadoAntecipadoProximoAno +
      VLRepassadoAntecipadoAnoAnterior;
    this.calcularTotalValidoRepassado();
  }

  calcularTotalValidoRepassado(): void {
    const { VLRepassadoTotalDispendio, VLRepassadoTotalDemaisCustos } = this.entity;
    this.entity.VLRepassadoTotalValido = VLRepassadoTotalDispendio + VLRepassadoTotalDemaisCustos;
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
      NRRegiao: 'SUDENE',
      IDInstituicao: 7,
      NREmpresa: 'Nestle',
      NRResponsavel: 'Vedita',
      NREmail: 'Vedita@dragonbal.bao',
      NRTelefone: '(61) 998856-4685',

      // abal dispencio repassado
      DTRepassadoAnoBase: moment().format('YYYY'),
      VLRepassadoRecursosHumanoa: 51,
      VLRepassadoTreinamento: 51,
      VLRepassadoEquipamentoSoftware: 51,
      VLRepassadoLivroPeriodico: 51,
      VLRepassadoObraCivil: 51,
      VLRepassadoViagem: 51,
      VLRepassadoMaterialConsumo: 51,
      VLRepassadoOuroCorrelato: 51,
      VLRepassadoServicoTerceiro: 51,
      VLRepassadoCustoInstituicao: 25,
      VLRepassadoTotalRepassadoInstituicao: 36,
      VLRepassadoAntecipadoProximoAno: 158,
      VLRepassadoAntecipadoAnoAnterior: 15,

      // abal dispencio proprio
      DTProprioAnoBase: moment().format('YYYY'),
      VLProprioRecursosHumanoa: 51,
      VLProprioTreinamento: 51,
      VLProprioEquipamentoSoftware: 51,
      VLProprioLivroPeriodico: 51,
      VLProprioObraCivil: 51,
      VLProprioViagem: 51,
      VLProprioMaterialConsumo: 51,
      VLProprioOuroCorrelato: 51,
      VLProprioServicoTerceiro: 51,

      // VLTotalDispendio: 0,
      // VLTotalDemaisCustos: 0,

      // tslint:disable-next-line:max-line-length
      DSObjetivo: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex',
      // tslint:disable-next-line:max-line-length
      DSDescricaoEtapa: 'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally',
      // tslint:disable-next-line:max-line-length
      DSResultadoObtido: 'Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular. Li lingues differe solmen in li grammatica, li pronunciation e li plu commun vocabules. Omnicos directe al desirabilite de un nov lingua franca: On refusa continuar payar custosi traductores. At solmen va esser necessi far uniform grammatica, pronunciation e plu sommun paroles. Ma quande lingues coalesce, li grammatica del resultant lingue es plu simplic e regulari quam ti del coalescent lingues. Li nov lingua franca va esser plu simplic e regulari quam li existent Europan',
    };

  }
}
