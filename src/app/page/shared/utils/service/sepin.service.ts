import { HttpHeaders } from '@angular/common/http';

export class SepinService {
    getHeader(config: any): object {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json');
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('NameTable', config.nameTable);
        if (config.nameId) {
            headers = headers.set('NamePrimaryKey', config.nameId);
        }

        return {
            headers: headers
        };
    }
}
