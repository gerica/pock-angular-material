import { Injectable } from '@angular/core';
import { ProjetoModule } from '../ projeto.module';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { SepinService } from 'src/app/page/shared/utils/service/sepin.service';

const URL_BASE = environment.urlBase;
const MODULE_PROJETO = environment.modules[0];

@Injectable()
export class ProjetoService extends SepinService {

  constructor(public http: HttpClient) {
    super(http);
  }

  fetchAll(): Observable<any> {
    // const params = new HttpParams().set('_page', "1").set('_limit', "1");
    return this.http.get(URL_BASE, this.getHeader(MODULE_PROJETO));
  }

  salvar(entity: any): Observable<any> {
    // const body = JSON.stringify(entity);
    const body = {
      ...entity
    };
    return this.http.post(URL_BASE, body, this.getHeader(MODULE_PROJETO));
  }

  apagar(id: any): Observable<any> {
    return this.http.delete(`${URL_BASE}/${id}`, this.getHeader(MODULE_PROJETO));
  }

  recuperarPorId(id: any): Observable<any> {
    return this.http.get(`${URL_BASE}/${id}`, this.getHeader(MODULE_PROJETO));
  }



}
