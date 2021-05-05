import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GenericService} from '../generic/generic.service';

@Injectable({
  providedIn: 'root'
})
export class UnidadMedidaService extends GenericService {

  url = `${this.url}/unidades-medidas/v1`

  constructor(private httpClient: HttpClient) {
    super();
  }

  public getUnidadesMedidas(): any {
    return this.httpClient.get(`${this.url}`);
  }
}
