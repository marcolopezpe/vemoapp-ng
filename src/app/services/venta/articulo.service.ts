import {Injectable} from '@angular/core';
import {GenericService} from '../generic/generic.service';
import {HttpClient} from '@angular/common/http';
import {Articulo} from '../../models/venta/articulo';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService extends GenericService {

  url = `${this.url}/articulos/v1`;

  constructor(private httpClient: HttpClient) {
    super();
  }

  public getArticulos(): any {
    return this.httpClient.get(`${this.url}`);
  }

  public getArticuloById(id: number): any {
    return this.httpClient.get(`${this.url}/${id}`);
  }

  public insertar(articulo: Articulo): any {
    return this.httpClient.post(`${this.url}`, JSON.stringify(articulo));
  }

  public actualizar(articulo: Articulo): any {
    return this.httpClient.put(`${this.url}/${articulo.id}`, JSON.stringify(articulo));
  }

  public eliminar(id: number): any {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  public getFinalStocks(): any {
    return this.httpClient.get(`${this.url}/final-stocks`);
  }
}
