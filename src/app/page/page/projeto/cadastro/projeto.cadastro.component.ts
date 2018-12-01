import { Component, OnInit } from '@angular/core';
import { ProjetoService } from '../service/projeto.service';
import { Router } from '@angular/router';
import { AppSnackBarService } from 'src/app/page/shared/utils/snackbar/app-snackbar.component';

const msgErrorForm = 'Informe os campos obrigatórios';

@Component({
  selector: 'app-projeto-cadastro',
  templateUrl: './projeto.cadastro.component.html',
  styleUrls: ['./projeto.cadastro.component.scss'],
  providers: [ProjetoService, AppSnackBarService]
})
export class ProjetoCadastroComponent implements OnInit {
  activeForm = true;

  entity: any;
  entities: any[];
  constructor(
    private projetoService: ProjetoService,
    private router: Router,
    private appSnackBarService: AppSnackBarService
  ) { }

  ngOnInit() {
    this.entity = {};
  }

  routerConsulta(): void {
    this.router.navigate(['lista_projeto']);
  }

  gravar(event: any, form: any): void {
    event.preventDefault();
    if (!form.valid) {
      this.appSnackBarService.open(msgErrorForm, null);
      return;
    }
    this.projetoService.gravar(this.entity).subscribe(
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
