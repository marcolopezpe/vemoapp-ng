import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Login} from '../../../models/seguridad/login';
import {LoginService} from '../../../services/seguridad/login.service';
import {AuthService} from '../../../services/seguridad/auth.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  frmLogin: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private loginService: LoginService,
              private authService: AuthService,
              private toastrService: ToastrService,
              private router: Router) {
  }

  ngOnInit(): void {
    if (!this.authService.isTokenExpired()) {
      this.router.navigate(['/inicio']);
    }

    this.frmLogin = this.formBuilder.group({
      usuario: ['', [Validators.required]],
      contrasena: ['', [Validators.required]]
    });
  }

  ingresar() {
    const login: Login = {
      usuario: this.f.usuario.value,
      contrasena: this.f.contrasena.value
    };

    this.loginService.login(login).subscribe((res) => {
      this.router.navigate(['/inicio']);
      this.toastrService.success('Bienvenido al Sistema');
      console.log(res);
    }, (err) => {
      this.toastrService.error('Error, no se puede ingresar');
      console.error(err);
    });
  }

  get f() {
    return this.frmLogin.controls;
  }
}
