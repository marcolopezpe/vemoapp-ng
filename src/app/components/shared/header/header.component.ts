import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../../../services/seguridad/login.service';
import {AuthService} from '../../../services/seguridad/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  usuario: string;

  constructor(
    private loginService: LoginService,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.usuario = this.authService.getUsuario();
  }

  salir() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
