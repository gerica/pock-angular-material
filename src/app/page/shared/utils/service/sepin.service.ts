import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


const URL_BASE = environment.urlBase;
@Injectable()
export class SepinService {

    constructor(public http: HttpClient) {
    }

    fetchAll(objModule): Observable<any> {
        // const params = new HttpParams().set('_page', "1").set('_limit', "1");
        return this.http.get(URL_BASE, this.getHeader(objModule));
    }

    getHeader(config: any): object {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json');
        headers = headers.set('Accept', 'application/json');
        if (config) {
            // headers = headers.set('NameTable', config.name || '');
            // headers = headers.set('NamePrimaryKey', config.nameId || '');
            headers = headers.set('NameModule', config.name || '');
        }
        return {
            headers: headers
        };
    }
}
