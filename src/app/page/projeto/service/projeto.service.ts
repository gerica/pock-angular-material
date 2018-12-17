import { Injectable } from '@angular/core';
import { ProjetoModule } from '../projeto.module';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { SepinService } from 'src/app/page/shared/utils/service/sepin.service';

const URL_BASE = environment.urlBase;
const URL_PROJETO = `${environment.urlApp}/projeto`;
const MODULE_PROJETO = environment.moduleProjeto;
const MODULE_PROJETO_DISPENDIO = environment.moduleProjetoDispendio;
const CUSTOM_SAVE = '/customSave';

@Injectable()
export class ProjetoService extends SepinService {

  constructor(public http: HttpClient) {
    super(http);
  }

  fetchAll(): Observable<any> {
    // const params = new HttpParams().set('_page', "1").set('_limit', "1");
    return this.http.get(URL_PROJETO, this.getHeader(MODULE_PROJETO));
  }

  salvar(entityStep1: any, entityStep2: any): Observable<any> {
    entityStep1.module = MODULE_PROJETO.name;
    entityStep2.module = MODULE_PROJETO_DISPENDIO.name;
    const entitiesChilds = [entityStep2];
    const body = {
      entityParent: entityStep1,
      // entity2: entityStep2,
      entitiesChilds
    };
    return this.http.post(`${URL_PROJETO}${CUSTOM_SAVE}`, body, this.getHeader(MODULE_PROJETO));
  }

  apagar(id: any): Observable<any> {
    return this.http.delete(`${URL_PROJETO}/${id}`, this.getHeader(MODULE_PROJETO));
  }

  recuperarPorId(id: any): Observable<any> {
    return this.http.get(`${URL_PROJETO}/customFindById/${id}`, this.getHeader(MODULE_PROJETO));
  }



}
