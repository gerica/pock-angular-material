import { Injectable } from '@angular/core';
import { ProjetoModule } from '../ projeto.module';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { SepinService } from 'src/app/page/shared/utils/service/sepin.service';

const URL_BASE = environment.urlBase;
const OBJ_TABLE = environment.tables[0];

@Injectable()
export class ProjetoService extends SepinService {

  constructor(private http: HttpClient) {
    super();
  }

  fetchAll(): Observable<any> {
    // const params = new HttpParams().set('_page', "1").set('_limit', "1");
    return this.http.get(URL_BASE, this.getHeader(OBJ_TABLE));
  }

  salvar(entity: any): Observable<any> {
    // const body = JSON.stringify(entity);
    const body = {
      ...entity
    };
    return this.http.post(URL_BASE, body, this.getHeader(OBJ_TABLE));
  }

  apagar(id: any): Observable<any> {
    return this.http.delete(`${URL_BASE}/${id}`, this.getHeader(OBJ_TABLE));
  }

  recuperarPorId(id: any): Observable<any> {
    return this.http.get(`${URL_BASE}/${id}`, this.getHeader(OBJ_TABLE));
  }



}
