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
      } else if (environment.isDevelope) {
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

  gravar(event: any, form1: any, form2: any): void {
    event.preventDefault();
    if (!form1.valid || !form2.valid) {
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
      // tslint:disable-next-line:max-line-length
      DSObjetivo: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex',
      // tslint:disable-next-line:max-line-length
      DSDescricaoEtapa: 'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally',
      // tslint:disable-next-line:max-line-length
      DSResultadoObtido: 'Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular. Li lingues differe solmen in li grammatica, li pronunciation e li plu commun vocabules. Omnicos directe al desirabilite de un nov lingua franca: On refusa continuar payar custosi traductores. At solmen va esser necessi far uniform grammatica, pronunciation e plu sommun paroles. Ma quande lingues coalesce, li grammatica del resultant lingue es plu simplic e regulari quam ti del coalescent lingues. Li nov lingua franca va esser plu simplic e regulari quam li existent Europan',
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
