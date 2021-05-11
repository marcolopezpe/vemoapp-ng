import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MovimientoService} from '../../../../services/venta/movimiento.service';
import Utils from '../../../../models/shared/utils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-movimiento-salida',
  templateUrl: './movimiento-salida.component.html',
  styleUrls: ['./movimiento-salida.component.css']
})
export class MovimientoSalidaComponent implements OnInit {

  frmFiltro: FormGroup;
  salidas = [];

  constructor(
    private formBuilder: FormBuilder,
    private movimientoService: MovimientoService
  ) { }

  ngOnInit(): void {
    this.frmFiltro = this.formBuilder.group({
      desde: [Utils.extractDateOf(new Date())],
      hasta: [Utils.extractDateOf(new Date())],
      descripcion: ['']
    });

    this.loadSalidas();
  }

  loadSalidas() {
    let desde = Utils.extractDateOf(this.f.desde.value);
    let hasta = Utils.extractDateOf(this.f.hasta.value);
    let descripcion = this.f.descripcion.value;

    this.movimientoService.getMovimientosByFiltro(desde, hasta, descripcion, 'S').subscribe(res => {
      this.salidas = res.result;
    }, (err) => {
      console.error(err);
    });
  }

  get f() {
    return this.frmFiltro.controls;
  }

  eliminar(row) {
    Swal.fire({
      title: 'Eliminar',
      text: `¿Esta seguro de eliminar la Salida con Fecha "${Utils.toDateFormat(row.fecha)}" y Articulo "${row.articulo.codigo + ' / ' + row.articulo.descripcion}"?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar',
      cancelButtonText: 'No',
      confirmButtonColor: '#dc3545'
    }).then((result) => {
      if (result.value) {
        this.movimientoService.eliminar(row.id).subscribe(res => {
          this.loadSalidas();
          Swal.fire(
            'Eliminado',
            'Registro eliminado correctamente.',
            'success'
          );
        }, (err) => {
          console.error(err);
          Swal.fire(
            'Error',
            'Error al eliminar',
            'error'
          );
        });
      }
    });
  }
}
