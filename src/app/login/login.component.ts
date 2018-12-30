import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppSnackBarService } from 'src/app/page/shared/utils/snackbar/app-snackbar.component';
import { AppMessages, MSG001, MSG101 } from 'src/app/page/shared/utils/app.messages';
import { Subscription } from 'rxjs';
import { SepinService } from 'src/app/page/shared/utils/service/sepin.service';
import { environment } from 'src/environments/environment';
import { BaseComponent } from '../page/base.component';
import { paths } from '../page/app-paths';
// import * as moment from 'moment';

const MODULE_AREA_APLICACAO = environment.moduleAreaAplicacao;

const URL_AREA_APLICACAO = 'area_aplicacao';
@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  providers: [SepinService]
})
export class LoginComponent extends BaseComponent implements OnInit {
  activeForm = true;
  entity: any;
  msgObrigatorio = AppMessages.getObj(MSG001);

  constructor(
    private router: Router,
    private sepinService: SepinService,
    public appSnackBarService: AppSnackBarService,
  ) {
    super(appSnackBarService);
  }

  ngOnInit() {
    this.entity = {};
  }

  login(event: any, form: any): void {
    event.preventDefault();
    if (!form.valid) {
      this.addSnackBar(AppMessages.getObj(MSG001));
      return;
    }
    this.router.navigate([`${paths.page}/${paths.dashboard}`]);
  }

}
