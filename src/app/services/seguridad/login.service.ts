import {Injectable} from '@angular/core';
import {GenericService} from '../generic/generic.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Login} from '../../models/seguridad/login';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends GenericService {

  constructor(private httpClient: HttpClient) {
    super();
  }

  public login(login: Login): any {
    const body = JSON.stringify(login);

    this.options.headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.options.params = new HttpParams();

    return this.httpClient.post(`${this.url}/login`, body, {observe: 'response'})
      .pipe(map(res => {

        const token = res.headers.get('Authorization');

        localStorage.removeItem('token');
        localStorage.setItem('token', token);
        return res;
      }));
  }

  public logout() {
    localStorage.removeItem('token');
  }
}


