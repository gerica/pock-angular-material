import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


const SAVE_RETURN_ID = 'saveAndReturnId';
@Injectable()
export class BaseTempService {
    private msgErrorURl = 'Informa a url';

    constructor(public http: HttpClient, public urlBase: string) {
        if (!this.urlBase) {
            throw new Error(this.msgErrorURl);
        }
    }

    fetchAll(objModule: any): Observable<any> {
        if (!this.urlBase) {
            throw new Error(this.msgErrorURl);
        }
        return this.http.get(this.urlBase, this.getHeader(objModule));
    }

    salvar(objModule: any, entity: any): Observable<any> {
        if (!this.urlBase) {
            throw new Error(this.msgErrorURl);
        }
        const body = {
            ...entity
        };
        return this.http.post(this.urlBase, body, this.getHeader(objModule));
    }
    salvarAndReturnId(objModule: any, entity: any): Observable<any> {
        if (!this.urlBase) {
            throw new Error(this.msgErrorURl);
        }
        const body = {
            ...entity
        };
        return this.http.post(`${this.urlBase}/${SAVE_RETURN_ID}`, body, this.getHeader(objModule));
    }

    apagar(objModule: any, id: any): Observable<any> {
        if (!this.urlBase) {
            throw new Error(this.msgErrorURl);
        }
        return this.http.delete(`${this.urlBase}/${id}`, this.getHeader(objModule));
    }

    fetchById(objModule: any, id: any): Observable<any> {
        if (!this.urlBase) {
            throw new Error(this.msgErrorURl);
        }
        return this.http.get(`${this.urlBase}/${id}`, this.getHeader(objModule));
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
