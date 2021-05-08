import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {InicioComponent} from './components/inicio/inicio.component';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './components/seguridad/login/login.component';
import {HeaderComponent} from './components/shared/header/header.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {ClienteComponent} from './components/venta/cliente/cliente.component';
import {ClienteRegistroComponent} from './components/venta/cliente/cliente-registro/cliente-registro.component';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {AuthInterceptor} from './interceptors/auth/auth.interceptor';
import {ArticuloComponent} from './components/venta/articulo/articulo.component';
import {ArticuloRegistroComponent} from './components/venta/articulo/articulo-registro/articulo-registro.component';
import {MovimientoComponent} from './components/venta/movimiento/movimiento.component';
import {BsDatepickerModule, BsLocaleService} from 'ngx-bootstrap/datepicker';
import {defineLocale} from 'ngx-bootstrap/chronos';
import {esLocale} from 'ngx-bootstrap/locale';
import { MovimientoRegistroComponent } from './components/venta/movimiento/movimiento-registro/movimiento-registro.component';
import {ModalModule} from 'ngx-bootstrap/modal';

defineLocale('es', esLocale);

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    LoginComponent,
    HeaderComponent,
    ClienteComponent,
    ClienteRegistroComponent,
    ArticuloComponent,
    ArticuloRegistroComponent,
    MovimientoComponent,
    MovimientoRegistroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxDatatableModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      positionClass: 'toast-top-center'
    }),
    BsDatepickerModule,
    // ToastrModule added
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private localeService: BsLocaleService) {
    this.localeService.use('es');
  }
}
