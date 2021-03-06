import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppSnackBarService } from 'src/app/page/shared/utils/snackbar/app-snackbar.component';
import { BaseComponent } from '../../base.component';
import { AppMessages, MSG001, MSG101 } from 'src/app/page/shared/utils/app.messages';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { paths } from '../../app-paths';
import { BaseService } from '../../shared/utils/service/base.service';
// import * as moment from 'moment';

const MODULE_FORMACAO = environment.moduleFormacao;

const URL_FORMACAO = `${paths.page}/${paths.formacao}`;

@Component({
  selector: 'app-formacao-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent extends BaseComponent implements OnInit, OnDestroy {
  activeForm = true;
  private subscription: Subscription;
  entity: any;
  msgObrigatorio = AppMessages.getObj(MSG001);

  constructor(
    private router: Router,
    private actionRoute: ActivatedRoute,
    private baseService: BaseService,
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
    this.baseService.fetchById(MODULE_FORMACAO, id).subscribe(
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
    this.router.navigate([URL_FORMACAO]);
  }

  gravar(event: any, form: any): void {
    event.preventDefault();
    if (!form.valid) {
      this.addSnackBar(AppMessages.getObj(MSG001));
      return;
    }
    this.baseService.salvar(MODULE_FORMACAO, this.entity).subscribe(
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
