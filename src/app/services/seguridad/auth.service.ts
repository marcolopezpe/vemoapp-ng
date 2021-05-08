import {Injectable} from '@angular/core';
import jwtDecode from 'jwt-decode';
import {Token} from '../../models/seguridad/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isTokenExpired(token?: string): boolean {
    if (!token) token = this.getToken();

    if (!token) return true;

    const decoded = jwtDecode(token);
    if (!decoded) return true;

    const oToken: Token = decoded as Token;
    if (oToken.exp === undefined) return true;

    const date = new Date(0);
    date.setUTCSeconds(oToken.exp);
    return (new Date().valueOf() > date.valueOf());
  }

  getUsuario(): string {
    if (this.isTokenExpired()) return null;

    const decoded = jwtDecode(this.getToken());
    const oToken: Token = decoded as Token;
    return oToken.sub;
  }

  isTokenNotFound() {
    return !this.getToken();
  }
}
