import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MovimientoService} from '../../../../services/venta/movimiento.service';
import Utils from '../../../../models/shared/utils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-movimiento-entrada',
  templateUrl: './movimiento-entrada.component.html',
  styleUrls: ['./movimiento-entrada.component.css']
})
export class MovimientoEntradaComponent implements OnInit {

  frmFiltro: FormGroup;
  entradas = [];

  constructor(
    private formBuilder: FormBuilder,
    private movimientoService: MovimientoService
  ) {
  }

  ngOnInit(): void {
    this.frmFiltro = this.formBuilder.group({
      desde: [Utils.dateWithFirstDay()],
      hasta: [Utils.extractDateOf(new Date())],
      descripcion: ['']
    });

    this.loadEntradas();
  }

  loadEntradas() {
    let desde = Utils.extractDateOf(this.f.desde.value);
    let hasta = Utils.extractDateOf(this.f.hasta.value);
    let descripcion = this.f.descripcion.value;

    this.movimientoService.getMovimientosByFiltro(desde, hasta, descripcion, 'E').subscribe(res => {
      this.entradas = res.result;
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
      text: `¿Esta seguro de eliminar la Entrada con Fecha "${Utils.toDateFormat(row.fecha)}" y Articulo "${row.articulo.codigo + ' / ' + row.articulo.descripcion}"?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar',
      cancelButtonText: 'No',
      confirmButtonColor: '#dc3545'
    }).then((result) => {
      if (result.value) {
        this.movimientoService.eliminar(row.id).subscribe(res => {
          this.loadEntradas();
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
