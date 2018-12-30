import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppSnackBarService } from 'src/app/page/shared/utils/snackbar/app-snackbar.component';
import { BaseComponent } from '../../base.component';
import { AppMessages, MSG001, MSG101 } from 'src/app/page/shared/utils/app.messages';
import { Subscription } from 'rxjs';
import { SepinService } from 'src/app/page/shared/utils/service/sepin.service';
import { environment } from 'src/environments/environment';
import { paths } from '../../app-paths';
// import * as moment from 'moment';

const MODULE_AREA_APLICACAO = environment.moduleAreaAplicacao;

const URL_AREA_APLICACAO = `${paths.page}/${paths.area_aplicacao}`;

@Component({
  selector: 'app-area.aplicacao-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
  providers: [SepinService]
})
export class CadastroComponent extends BaseComponent implements OnInit, OnDestroy {
  activeForm = true;
  private subscription: Subscription;
  entity: any;
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
    this.entity = {};
    this.subscription = this.actionRoute.params.subscribe(params => {
      if (params && params['id']) {
        this.fetchById(params['id']);
      }
    });
  }

  fetchById(id: any): any {
    this.sepinService.fetchById(MODULE_AREA_APLICACAO, id).subscribe(
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
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  routerConsulta(): void {
    this.router.navigate([URL_AREA_APLICACAO]);
  }

  gravar(event: any, form: any): void {
    event.preventDefault();
    if (!form.valid) {
      this.addSnackBar(AppMessages.getObj(MSG001));
      return;
    }
    this.sepinService.salvar(MODULE_AREA_APLICACAO, this.entity).subscribe(
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

}
