import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppSnackBarService } from 'src/app/page/shared/utils/snackbar/app-snackbar.component';
import { AppMessages, MSG001, MSG101 } from 'src/app/page/shared/utils/app.messages';
import { Subscription, Observable } from 'rxjs';
import { SepinService } from 'src/app/page/shared/utils/service/sepin.service';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { NgForm, NgModel } from '@angular/forms';
import { map } from 'rxjs/operators';
import { BaseComponent } from 'src/app/page/base.component';
import { MatDialog } from '@angular/material';
import { DialogEstrangeiroComponent } from './dialog.estrangeiro.component';

const MODULE_RECURSO_HUMANO = environment.moduleRecursoHumano;
const URL_PROJETO = 'recurso-humano';

@Component({
  selector: 'app-recurso-humano-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
  providers: [SepinService]
})
export class CadastroComponent extends BaseComponent implements OnInit, OnDestroy {
  title = 'Cadastro';
  dispendios: any;
  naoPossuiCPF = false;

  private subscription: Subscription;
  entity: any;
  areaAplicacoes: any;
  instituincoes: any;
  types: any;
  currentAreaAplicacao: any;
  escolaridades: any[];
  formacoes: any[];
  maskCPF = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  msgObrigatorio = AppMessages.getObj(MSG001);

  constructor(
    private router: Router,
    private actionRoute: ActivatedRoute,
    private sepinService: SepinService,
    public appSnackBarService: AppSnackBarService,
    public dialog: MatDialog
  ) {
    super(appSnackBarService);
  }

  ngOnInit() {
    this.entity = {};
    this.montarDispendios();
    this.montarEscolaridades();
    this.montarFormacoes();
    this.subscription = this.actionRoute.params.subscribe(params => {
      if (params && params['id']) {
        this.recuperarPorId(params['id']);
      } else {
      }

      if (environment.isDevelope) {
        this.initForDevelop();
      }
    });
  }

  recuperarPorId(id: any): any {
    this.sepinService.recuperarPorId(MODULE_RECURSO_HUMANO, id).subscribe(
      onNext => {
        if (onNext && onNext.value && onNext.value.length > 0) {
          this.entity = onNext.value[0];
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
    this.dispendios = [
      { value: 'RH Direto' },
      { value: 'RH Indireto' },
    ];
  }

  montarEscolaridades(): void {
    this.escolaridades = [
      { value: 'Ensino Médio' },
      { value: 'Ensino Superior' },
      { value: 'Especialização' },
      { value: 'Mestrado' },
      { value: 'Doutorado' },
      { value: 'Pós Doutorado' },
    ];
  }

  montarFormacoes(): void {
    this.formacoes = [
      { value: 'Administração' },
      { value: 'Ciências da computação' },
      { value: 'Computação' },
      { value: 'Engenharia aeroespacial' },
      { value: 'Engenharia Automotiva' },
      { value: 'Engenharia De automação e controle' },
      { value: 'Engenharia De computação' },
      { value: 'Engenharia De energia' },
      { value: 'Engenharia De produção' },
      { value: 'Engenharia De redes de comunicações' },
      { value: 'Engenharia De software' },
      { value: 'Engenharia De telecomunicações' },
      { value: 'Engenharia Elétrica' },
      { value: 'Engenharia Eletrônica' },
      { value: 'Engenharia Mecânica' },
      { value: 'Engenharia Mecatrônica' },
      { value: 'Engenharia Química' },
      { value: 'Estatística' },
      { value: 'Física' },
      { value: 'Matemática' },
      { value: 'Química' },
      { value: 'Outra' },
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

    this.sepinService.salvar(MODULE_RECURSO_HUMANO, this.entity).subscribe(
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

  limparCPF(): void {
    delete this.entity.NRCPFColaborador;
    delete this.entity.NRNomeColaborador;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogEstrangeiroComponent, { width: '40%' });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.name) {
        this.entity.IDEstrangeiro = result.id;
        this.entity.NRNomeColaborador = result.name;
      }
    });
  }

  initForDevelop() {
    this.entity = {};

  }
}
