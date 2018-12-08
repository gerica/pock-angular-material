import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppSnackBarService } from 'src/app/page/shared/utils/snackbar/app-snackbar.component';
import { BaseComponent } from '../../base.component';
import { AppMessages, MSG001, MSG101 } from 'src/app/page/shared/utils/app.messages';
import { Subscription } from 'rxjs';
import { SepinService } from 'src/app/page/shared/utils/service/sepin.service';
import { environment } from 'src/environments/environment';
// import * as moment from 'moment';

const MODULE_FORMACAO = environment.moduleFormacao;

@Component({
  selector: 'app-formacao-cadastro',
  templateUrl: './formacao.cadastro.component.html',
  styleUrls: ['./formacao.cadastro.component.scss'],
  providers: [SepinService]
})
export class FormacaoCadastroComponent extends BaseComponent implements OnInit, OnDestroy {
  activeForm = true;
  private subscription: Subscription;
  entity: any;
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
      console.log(params);
      if (params && params['idFormacao']) {
        console.log('entrou');
        this.recuperarPorId(params['idFormacao']);
      }
    });
  }

  recuperarPorId(id: any): any {
    console.log(id);
    this.sepinService.recuperarPorId(MODULE_FORMACAO, id).subscribe(
      onNext => {
        console.log(onNext);
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  routerConsulta(): void {
    this.router.navigate(['lista_formacao']);
  }

  gravar(event: any, form: any): void {
    event.preventDefault();
    if (!form.valid) {
      this.addSnackBar(AppMessages.getObj(MSG001));
      return;
    }
    this.sepinService.salvar(MODULE_FORMACAO, this.entity).subscribe(
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
