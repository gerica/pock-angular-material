import { Injectable } from '@angular/core';
import { ProjetoModule } from '../ projeto.module';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const URL_BASE = environment.urlBase;
const URL_PROJETO = `${URL_BASE}/projeto`;

@Injectable()
export class ProjetoService {

  constructor(private http: HttpClient) { }

  fetchAll(): Observable<any> {
    // const params = new HttpParams().set('_page', "1").set('_limit', "1");
    return this.http.get(URL_PROJETO);
  }

  gravar(entity: any): Observable<any> {
    // const body = JSON.stringify(entity);
    const body = {
      ...entity
    };

    return this.http.post(URL_PROJETO, body);
  }

}
