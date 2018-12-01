import { Component, OnInit } from '@angular/core';
import { ProjetoService } from '../service/projeto.service';
import { Router } from '@angular/router';
import { AppSnackBarService } from 'src/app/page/shared/utils/snackbar/app-snackbar.component';
import { BaseComponent } from '../../base.component';
import { AppMessages, MSG001 } from 'src/app/page/shared/utils/app.messages';

@Component({
  selector: 'app-projeto-cadastro',
  templateUrl: './projeto.cadastro.component.html',
  styleUrls: ['./projeto.cadastro.component.scss'],
  providers: [ProjetoService]
})
export class ProjetoCadastroComponent extends BaseComponent implements OnInit {
  activeForm = true;

  entity: any;
  entities: any[];
  constructor(
    private projetoService: ProjetoService,
    private router: Router,
    public appSnackBarService: AppSnackBarService
  ) {
    super(appSnackBarService);
  }

  ngOnInit() {
    this.entity = {};
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
        console.log(onNext);
      }, onError => {
        console.log(onError);
      }, () => {
        this.routerConsulta();
      }
    );
  }
}
