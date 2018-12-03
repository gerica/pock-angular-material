import { Injectable } from '@angular/core';
import { ProjetoModule } from '../ projeto.module';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { SepinService } from 'src/app/page/shared/utils/service/sepin.service';

const URL_BASE = environment.urlBase;
const OBJ_TABLE = environment.tables[1];

@Injectable()
export class TipoProjetoService extends SepinService {

  constructor(private http: HttpClient) {
    super();
  }

  fetchAll(): Observable<any> {
    // const params = new HttpParams().set('_page', "1").set('_limit', "1");
    return this.http.get(URL_BASE, this.getHeader(OBJ_TABLE));
  }

}
