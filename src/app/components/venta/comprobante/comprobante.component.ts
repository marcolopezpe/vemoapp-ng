import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ComprobanteService} from '../../../services/venta/comprobante.service';
import Utils from '../../../models/shared/utils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comprobante',
  templateUrl: './comprobante.component.html',
  styleUrls: ['./comprobante.component.css']
})
export class ComprobanteComponent implements OnInit {

  frmFiltro: FormGroup;
  comprobantes = [];

  constructor(
    private formBuilder: FormBuilder,
    private comprobanteService: ComprobanteService
  ) {
  }

  ngOnInit(): void {
    this.frmFiltro = this.formBuilder.group({
      desde: [Utils.dateWithFirstDay()],
      hasta: [Utils.extractDateOf(new Date())],
      numero: [''],
      cliente: ['']
    });

    this.loadComprobantes();
  }

  loadComprobantes() {
    let desde = Utils.extractDateOf(this.f.desde.value);
    let hasta = Utils.extractDateOf(this.f.hasta.value);
    let numero = this.f.numero.value;
    let cliente = this.f.cliente.value;

    this.comprobanteService.getComprobantesByFiltro(desde, hasta, numero, cliente).subscribe(res => {
      this.comprobantes = res.result;
    }, (err) => {
      this.comprobantes = [];
      console.error(err);
    });
  }

  get f() {
    return this.frmFiltro.controls;
  }

  eliminar(row) {
    Swal.fire({
      title: 'Eliminar',
      text: `¿Esta seguro de eliminar el Comprobnate "${row.serie + '-' + row.numero}"?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar',
      cancelButtonText: 'No',
      confirmButtonColor: '#dc3545'
    }).then((result) => {
      if (result.value) {
        this.comprobanteService.eliminar(row.id).subscribe(res => {
          this.loadComprobantes();
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
