import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


const URL_BASE = environment.urlBase;
const SAVE_RETURN_ID = `${URL_BASE}/saveAndReturnId`;
@Injectable()
export class SepinService {

    constructor(public http: HttpClient) {
    }

    fetchAll(objModule: any): Observable<any> {
        // const params = new HttpParams().set('_page', "1").set('_limit', "1");
        return this.http.get(URL_BASE, this.getHeader(objModule));
    }

    salvar(objModule: any, entity: any): Observable<any> {
        const body = {
            ...entity
        };
        return this.http.post(URL_BASE, body, this.getHeader(objModule));
    }
    salvarAndReturnId(objModule: any, entity: any): Observable<any> {
        const body = {
            ...entity
        };
        return this.http.post(SAVE_RETURN_ID, body, this.getHeader(objModule));
    }

    apagar(objModule: any, id: any): Observable<any> {
        return this.http.delete(`${URL_BASE}/${id}`, this.getHeader(objModule));
    }

    fetchById(objModule: any, id: any): Observable<any> {
        return this.http.get(`${URL_BASE}/${id}`, this.getHeader(objModule));
    }

    getHeader(config: any): object {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json');
        headers = headers.set('Accept', 'application/json');
        if (config) {
            // headers = headers.set('NameTable', config.name || '');
            headers = headers.set('NamePrimaryKey', config.id || '');
            headers = headers.set('NameModule', config.name || '');
        }
        return {
            headers: headers
        };
    }
}
