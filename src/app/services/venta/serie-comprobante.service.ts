import { Injectable } from '@angular/core';
import {GenericService} from '../generic/generic.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SerieComprobanteService extends GenericService {

  url = `${this.url}/series-comprobantes/v1`;

  constructor(private httpClient: HttpClient) {
    super();
  }

  public getSeriesComprobantes(): any {
    return this.httpClient.get(`${this.url}`);
  }
}
