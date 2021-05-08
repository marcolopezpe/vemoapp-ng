import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InicioComponent} from './components/inicio/inicio.component';
import {LoginComponent} from './components/seguridad/login/login.component';
import {AuthGuard} from './guards/authguard/auth.guard';
import {ClienteComponent} from './components/venta/cliente/cliente.component';
import {ClienteRegistroComponent} from './components/venta/cliente/cliente-registro/cliente-registro.component';
import {ArticuloComponent} from './components/venta/articulo/articulo.component';
import {ArticuloRegistroComponent} from './components/venta/articulo/articulo-registro/articulo-registro.component';
import {MovimientoComponent} from './components/venta/movimiento/movimiento.component';
import {MovimientoRegistroComponent} from './components/venta/movimiento/movimiento-registro/movimiento-registro.component';

const routes: Routes = [
  {path: '', redirectTo: 'inicio', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'inicio', component: InicioComponent, canActivate: [AuthGuard]},
  {path: 'clientes', component: ClienteComponent, canActivate: [AuthGuard]},
  {path: 'clientes/registro', component: ClienteRegistroComponent, canActivate: [AuthGuard]},
  {path: 'clientes/registro/:id', component: ClienteRegistroComponent, canActivate: [AuthGuard]},
  {path: 'articulos', component: ArticuloComponent, canActivate: [AuthGuard]},
  {path: 'articulos/registro', component: ArticuloRegistroComponent, canActivate: [AuthGuard]},
  {path: 'articulos/registro/:id', component: ArticuloRegistroComponent, canActivate: [AuthGuard]},
  {path: 'movimientos', component: MovimientoComponent, canActivate: [AuthGuard]},
  {path: 'movimientos/registro', component: MovimientoRegistroComponent, canActivate: [AuthGuard]},
  {path: 'movimientos/registro/:id', component: MovimientoRegistroComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
