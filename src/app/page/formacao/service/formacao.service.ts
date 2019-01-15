import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { SepinService } from 'src/app/page/shared/utils/service/sepin.service';
import { BaseService } from '../../shared/utils/service/base.service';


const URL_BASE = environment.urlBase;
const URL_PROJETO = `${environment.urlApp}/projeto`;
const MODULE_PROJETO = environment.moduleProjeto;
const MODULE_PROJETO_DISPENDIO = environment.moduleProjetoDispendio;
const CUSTOM_SAVE = '/customSave';

const URL_FORMACAO = 'formacao';

@Injectable()
export class ServiceService extends BaseService {

    constructor(public http: HttpClient) {
        super(http);
    }

}
