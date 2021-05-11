import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InicioComponent} from './components/inicio/inicio.component';
import {LoginComponent} from './components/seguridad/login/login.component';
import {AuthGuard} from './guards/authguard/auth.guard';
import {ClienteComponent} from './components/venta/cliente/cliente.component';
import {ClienteRegistroComponent} from './components/venta/cliente/cliente-registro/cliente-registro.component';
import {ArticuloComponent} from './components/venta/articulo/articulo.component';
import {ArticuloRegistroComponent} from './components/venta/articulo/articulo-registro/articulo-registro.component';
import {ComprobanteComponent} from './components/venta/comprobante/comprobante.component';
import {ComprobanteRegistroComponent} from './components/venta/comprobante/comprobante-registro/comprobante-registro.component';
import {MovimientoSalidaComponent} from './components/venta/movimiento/movimiento-salida/movimiento-salida.component';
import {MovimientoEntradaComponent} from './components/venta/movimiento/movimiento-entrada/movimiento-entrada.component';
import {MovimientoEntradaRegistroComponent} from './components/venta/movimiento/movimiento-entrada/movimiento-entrada-registro/movimiento-entrada-registro.component';

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
  {path: 'entradas', component: MovimientoEntradaComponent, canActivate: [AuthGuard]},
  {path: 'entradas/registro', component: MovimientoEntradaRegistroComponent, canActivate: [AuthGuard]},
  {path: 'entradas/registro/:id', component: MovimientoEntradaRegistroComponent, canActivate: [AuthGuard]},
  {path: 'salidas', component: MovimientoSalidaComponent, canActivate: [AuthGuard]},
  {path: 'comprobantes', component: ComprobanteComponent, canActivate: [AuthGuard]},
  {path: 'comprobantes/registro', component: ComprobanteRegistroComponent, canActivate: [AuthGuard]},
  {path: 'comprobantes/registro/:id', component: ComprobanteRegistroComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
