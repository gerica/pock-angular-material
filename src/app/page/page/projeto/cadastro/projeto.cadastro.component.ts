import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProjetoService } from '../service/projeto.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppSnackBarService } from 'src/app/page/shared/utils/snackbar/app-snackbar.component';
import { BaseComponent } from '../../base.component';
import { AppMessages, MSG001, MSG101 } from 'src/app/page/shared/utils/app.messages';
import { Subscription } from 'rxjs';
import { TipoProjetoService } from '../service/tipo.projeto.service';

@Component({
  selector: 'app-projeto-cadastro',
  templateUrl: './projeto.cadastro.component.html',
  styleUrls: ['./projeto.cadastro.component.scss'],
  providers: [ProjetoService, TipoProjetoService]
})
export class ProjetoCadastroComponent extends BaseComponent implements OnInit, OnDestroy {
  activeForm = true;
  private subscription: Subscription;
  entity: any;
  entities: any[];
  types: any[];
  constructor(
    private projetoService: ProjetoService,
    private router: Router,
    private actionRoute: ActivatedRoute,
    private tipoProjetoService: TipoProjetoService,
    public appSnackBarService: AppSnackBarService,
  ) {
    super(appSnackBarService);
  }

  ngOnInit() {
    this.entity = {};
    this.recuperarTodosTipoProjeto();
    this.subscription = this.actionRoute.params.subscribe(params => {
      if (params && params['idProjeto']) {
        this.recuperarPorId(params['idProjeto']);
      }
    });
  }

  recuperarPorId(id: any): any {
    this.projetoService.recuperarPorId(id).subscribe(
      onNext => {
        if (onNext && onNext.value && onNext.value.length > 0) {
          this.entity = onNext.value[0];
          console.log(this.entity);
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
    this.tipoProjetoService.fetchAll().subscribe(
      onNext => {
        this.types = onNext;
      }, onError => {
        if (onError.error) {
          this.addSnackBar(AppMessages.getObjByMsg(onError.error.message, 'Erro'));
        } else {
          this.addSnackBar(AppMessages.getObj(MSG101));
        }
      }, () => {
        console.log('recuperarTodosTipoProjeto');
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
    this.projetoService.salvar(this.entity).subscribe(
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
