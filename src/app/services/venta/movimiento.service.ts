import {Injectable} from '@angular/core';
import {GenericService} from '../generic/generic.service';
import {HttpClient} from '@angular/common/http';
import {Cliente} from '../../models/venta/cliente';
import {Movimiento} from '../../models/venta/movimiento';

@Injectable({
  providedIn: 'root'
})
export class MovimientoService extends GenericService {

  url = `${this.url}/movimientos/v1`;

  constructor(private httpClient: HttpClient) {
    super();
  }

  public getMovimientos(): any {
    return this.httpClient.get(`${this.url}`);
  }

  public getMovimientosByFiltro(desde: Date, hasta: Date, descripcion, tipo): any {
    return this.httpClient.get(`${this.url}/filtro`, {
      params: {
        desde: desde.getTime().toString(),
        hasta: hasta.getTime().toString(),
        descripcion: descripcion,
        tipo: tipo
      }
    });
  }

  public getMovimientoById(id: number): any {
    return this.httpClient.get(`${this.url}/${id}`);
  }

  public insertar(movimiento: Movimiento): any {
    return this.httpClient.post(`${this.url}`, JSON.stringify(movimiento));
  }

  public actualizar(movimiento: Movimiento): any {
    return this.httpClient.put(`${this.url}/${movimiento.id}`, JSON.stringify(movimiento));
  }

  public eliminar(id: number): any {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
}
