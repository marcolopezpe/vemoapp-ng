import {Injectable} from '@angular/core';
import {GenericService} from '../generic/generic.service';
import {HttpClient} from '@angular/common/http';
import {Movimiento} from '../../models/venta/movimiento';
import {Comprobante} from '../../models/venta/comprobante';

@Injectable({
  providedIn: 'root'
})
export class ComprobanteService extends GenericService {

  url = `${this.url}/comprobantes/v1`;

  constructor(private httpClient: HttpClient) {
    super();
  }

  public getComprobantesByFiltro(desde: Date, hasta: Date, numero, cliente): any {
    return this.httpClient.get(`${this.url}/filtro`, {
      params: {
        desde: desde.getTime().toString(),
        hasta: hasta.getTime().toString(),
        numero: numero,
        cliente: cliente
      }
    });
  }

  public getComprobanteById(id: number): any {
    return this.httpClient.get(`${this.url}/${id}`);
  }

  public insertar(comprobante: Comprobante): any {
    return this.httpClient.post(`${this.url}`, JSON.stringify(comprobante));
  }

  public actualizar(comprobante: Comprobante): any {
    return this.httpClient.put(`${this.url}/${comprobante.id}`, JSON.stringify(comprobante));
  }

  public eliminar(id: number): any {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
}
