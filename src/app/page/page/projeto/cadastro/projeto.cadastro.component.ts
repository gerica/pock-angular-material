import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProjetoService } from '../service/projeto.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppSnackBarService } from 'src/app/page/shared/utils/snackbar/app-snackbar.component';
import { BaseComponent } from '../../base.component';
import { AppMessages, MSG001, MSG101 } from 'src/app/page/shared/utils/app.messages';
import { Subscription } from 'rxjs';
import { SepinService } from 'src/app/page/shared/utils/service/sepin.service';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';

const MODULE_PROJETO = environment.moduleProjeto;
const MODULE_PROJETO_DISPENDIO = environment.moduleProjetoDispendio;
const MODULE_TIPO_PROJETO = environment.moduleTipoProjeto;
@Component({
  selector: 'app-projeto-cadastro',
  templateUrl: './projeto.cadastro.component.html',
  styleUrls: ['./projeto.cadastro.component.scss'],
  providers: [ProjetoService, SepinService]
})
export class ProjetoCadastroComponent extends BaseComponent implements OnInit, OnDestroy {
  activeForm = true;
  private subscription: Subscription;
  entity: any;
  entityStep2: any;
  entities: any[];
  types: any[];
  constructor(
    private projetoService: ProjetoService,
    private router: Router,
    private actionRoute: ActivatedRoute,
    private sepinService: SepinService,
    public appSnackBarService: AppSnackBarService,
  ) {
    super(appSnackBarService);
  }

  ngOnInit() {
    this.entity = {};
    this.entityStep2 = { DTAnoBase: moment().format('YYYY') };
    this.recuperarTodosTipoProjeto();
    this.subscription = this.actionRoute.params.subscribe(params => {
      if (params && params['idProjeto']) {
        this.recuperarPorId(params['idProjeto']);
      } else {
        this.initForDevelop();
      }
    });
  }

  recuperarPorId(id: any): any {
    this.projetoService.recuperarPorId(id).subscribe(
      onNext => {
        if (onNext && onNext.value && onNext.value.length > 0) {
          this.entity = onNext.value[0][0];
          this.entityStep2 = onNext.value[1][0];
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
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  routerConsulta(): void {
    this.router.navigate(['lista_projeto']);
  }

  gravar(event: any, form: any): void {
    event.preventDefault();
    if (!form.valid) {
      this.addSnackBar(AppMessages.getObj(MSG001));
      return;
    }
    this.projetoService.salvar(this.entity, this.entityStep2).subscribe(
      onNext => {
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

  initForDevelop() {
    this.entity = {
      module: MODULE_PROJETO.name,
      IDTipoProjeto: 1,
      NRIdentificado: 'IDE2',
      NRSigla: 'test',
      NRNome: 'teste desenvolvimento',
      NREspecificador: 'específico',
      DTInicio: new Date(),
      DTFim: new Date(),
    };

    this.entityStep2 = {
      module: MODULE_PROJETO_DISPENDIO.name,
      DTAnoBase: moment().format('YYYY'),
      VLRecursosHumanoa: 51,
      VLTreinamento: 51,
      VLEquipamentoSoftware: 51,
      VLLivroPeriodico: 51,
      VLObraCivil: 51,
      VLViagem: 51,
      VLMaterialConsumo: 51,
      VLOuroCorrelato: 51,
      VLServicoTerceiro: 51,
      VLTotalValido: 51,
    };
  }
}
