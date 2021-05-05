import {Injectable} from '@angular/core';
import {GenericService} from '../generic/generic.service';
import {HttpClient} from '@angular/common/http';
import {Cliente} from '../../models/venta/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService extends GenericService {

  url = `${this.url}/clientes/v1`;

  constructor(private httpClient: HttpClient) {
    super();
  }

  public getClientes(): any {
    return this.httpClient.get(`${this.url}`);
  }

  public getClienteById(id: number): any {
    return this.httpClient.get(`${this.url}/${id}`);
  }

  public insertar(cliente: Cliente): any {
    return this.httpClient.post(`${this.url}`, JSON.stringify(cliente));
  }

  public actualizar(cliente: Cliente): any {
    return this.httpClient.put(`${this.url}/${cliente.id}`, JSON.stringify(cliente));
  }

  public eliminar(id: number): any {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
}
