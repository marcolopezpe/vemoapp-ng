import {Component, OnInit, TemplateRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {ComprobanteService} from '../../../../services/venta/comprobante.service';
import {ClienteService} from '../../../../services/venta/cliente.service';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Params, Router} from '@angular/router';
import Utils from '../../../../models/shared/utils';
import {Cliente} from '../../../../models/venta/cliente';
import {Comprobante} from '../../../../models/venta/comprobante';
import {SerieComprobanteService} from '../../../../services/venta/serie-comprobante.service';
import {SerieComprobante} from '../../../../models/venta/serie-comprobante';
import {ComprobanteDetalle} from '../../../../models/venta/comprobante-detalle';
import {ArticuloService} from '../../../../services/venta/articulo.service';
import {Articulo} from '../../../../models/venta/articulo';
import Swal from 'sweetalert2';
import {UnidadMedida} from '../../../../models/venta/unidad-medida';

@Component({
  selector: 'app-comprobante-registro',
  templateUrl: './comprobante-registro.component.html',
  styleUrls: ['./comprobante-registro.component.css']
})
export class ComprobanteRegistroComponent implements OnInit {

  seriesComprobantes = [];

  frmComprobante: FormGroup;
  submitted = false;
  id: number;
  title: string;

  clientesModalRef: BsModalRef;
  clientes = [];

  detalleSubmitted = false;
  detalleIndex = -1;
  detalle: ComprobanteDetalle;
  detalles: ComprobanteDetalle[] = [];
  detalleButtonTitle = 'Agregar';
  frmDetalle: FormGroup;
  articulos = [];
  articulosModalRef: BsModalRef;

  constructor(
    private formBuilder: FormBuilder,
    private comprobanteService: ComprobanteService,
    private serieComprobanteService: SerieComprobanteService,
    private clienteService: ClienteService,
    private articuloService: ArticuloService,
    private toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modalService: BsModalService
  ) {
  }

  ngOnInit(): void {
    this.frmComprobante = this.formBuilder.group({
      id: [''],
      fecha: [Utils.extractDateOf(new Date()), [Validators.required]],
      serie: ['', [Validators.required]],
      numero: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20), Validators.pattern(/^[.\d]+$/)]],
      clienteId: ['', [Validators.required]],
      cliente: ['']
    });

    this.frmDetalle = this.formBuilder.group({
      id: [''],
      articuloId: ['', [Validators.required]],
      articulo: [''],
      articuloCodigo: [''],
      articuloDescripcion: [''],
      articuloUnidadMedida: [''],
      precioUnitario: [0, [Validators.required]],
      cantidad: [0, [Validators.required]],
      kilos: [0, [Validators.required]]
    });

    this.serieComprobanteService.getSeriesComprobantes().subscribe(res => {
      this.seriesComprobantes = res.result;
    });

    this.loadComprobante();
  }

  loadComprobante() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
      if (this.id) {
        this.comprobanteService.getComprobanteById(this.id).subscribe(res => {
          this.f.id.setValue(res.result.id);
          this.f.fecha.setValue(Utils.stringToDate(res.result.fecha));
          this.f.serie.setValue(res.result.serie);
          this.f.numero.setValue(res.result.numero);
          this.f.clienteId.setValue(res.result.cliente.id);
          this.f.cliente.setValue(res.result.cliente.numeroDocumento + ' - ' + res.result.cliente.razonSocial);

          this.detalles = res.result.detalles;
          this.title = 'Editar Comprobante';
        });
      } else {
        this.title = 'Nuevo Comprobante';
      }
    });
  }

  openClientesModal(template: TemplateRef<any>) {
    this.clienteService.getClientes().subscribe(res => {
      this.clientes = res.result;
      this.clientesModalRef = this.modalService.show(template, {
        backdrop: true,
        ignoreBackdropClick: true,
        class: 'modal-xl'
      });
    });
  }

  seleccionarCliente(row: Cliente) {
    this.f.clienteId.setValue(row.id);
    this.f.cliente.setValue(row.numeroDocumento + ' - ' + row.razonSocial);
    this.clientesModalRef.hide();
  }

  guardar(e) {
    e.preventDefault();
    this.submitted = true;

    if (!this.frmComprobante.valid) return;
    const body: Comprobante = this.frmComprobante.value;
    body.cliente = new Cliente(this.f.clienteId.value);
    body.detalles = this.detalles;

    if (this.detalles.length == 0) {
      this.toastrService.error('No hay detalles.', 'Error');
      return;
    }

    if (!this.id) {
      this.comprobanteService.insertar(body).subscribe(res => {
        this.toastrService.success('Registro guardado correctamente.');
        this.router.navigate(['/comprobantes']);
      }, (err) => {
        console.log(err);
        this.toastrService.error('Error al insertar');
      });
    } else {
      this.comprobanteService.actualizar(body).subscribe(res => {
        this.toastrService.success('Registro actualizado correctamente.');
        this.router.navigate(['/comprobantes']);
      }, (err) => {
        console.log(err);
        this.toastrService.error('Error al actualizar');
      });
    }
  }

  get f() {
    return this.frmComprobante.controls;
  }

  valid(f, e) {
    return (this.frmComprobante.get(f).touched || this.submitted) && this.frmComprobante.hasError(e, f);
  }

  value(f, e) {
    return this.frmComprobante.get(f).getError(e);
  }

  openArticulosModal(template: TemplateRef<any>) {
    this.articuloService.getArticulos().subscribe(res => {
      this.articulos = res.result;
      this.articulosModalRef = this.modalService.show(template, {
        backdrop: true,
        ignoreBackdropClick: true,
        class: 'modal-xl'
      });
    });
  }

  seleccionarArticulo(row: Articulo) {
    this.fd.articuloId.setValue(row.id);
    this.fd.articulo.setValue(row.codigo + ' / ' + row.descripcion + ' (' + row.unidadMedida.nombre + ')');
    this.fd.articuloCodigo.setValue(row.codigo);
    this.fd.articuloDescripcion.setValue(row.descripcion);
    this.fd.articuloUnidadMedida.setValue(row.unidadMedida.nombre);
    this.articulosModalRef.hide();
  }

  nuevoDetalle() {
    this.detalleIndex = -1;
    this.detalleSubmitted = false;
    this.fd.articuloId.setValue('');
    this.fd.articulo.setValue('');
    this.fd.articuloCodigo.setValue('');
    this.fd.articuloDescripcion.setValue('');
    this.fd.precioUnitario.setValue(0);
    this.fd.cantidad.setValue(0);
    this.fd.kilos.setValue(0);
    this.detalleButtonTitle = 'Agregar';
  }

  agregarDetalle(e) {
    e.preventDefault();
    this.detalleSubmitted = true;

    if (!this.frmDetalle.valid) return;

    const articulo = new Articulo(this.fd.articuloId.value);
    articulo.codigo = this.fd.articuloCodigo.value;
    articulo.descripcion = this.fd.articuloDescripcion.value;

    const unidadMedida = new UnidadMedida(0);
    unidadMedida.nombre = this.fd.articuloUnidadMedida.value;

    articulo.unidadMedida = unidadMedida;

    const body: ComprobanteDetalle = this.frmDetalle.value;
    body.articulo = articulo;

    if (this.detalleIndex < 0) {
      this.detalles.push(body);
    } else {
      this.detalles[this.detalleIndex] = body;
    }

    this.detalles = [...this.detalles];
    this.nuevoDetalle();
  }

  editarDetalle(row, rowIndex) {
    this.detalleIndex = rowIndex;
    this.detalleSubmitted = false;
    this.fd.articuloId.setValue(row.articulo.id);
    this.fd.articulo.setValue(row.articulo.codigo + ' / ' + row.articulo.descripcion + '(' + row.articulo.unidadMedida.nombre + ')');
    this.fd.articuloCodigo.setValue(row.articulo.codigo);
    this.fd.articuloDescripcion.setValue(row.articulo.descripcion);
    this.fd.precioUnitario.setValue(row.precioUnitario);
    this.fd.cantidad.setValue(row.cantidad);
    this.fd.kilos.setValue(row.kilos);
    this.detalleButtonTitle = 'Actualizar';
  }

  quitarDetalle(row, rowIndex) {
    Swal.fire({
      title: 'Eliminar',
      text: `¿Esta seguro de quitar el Articulo "${row.articulo.codigo + ' (' + row.articulo.descripcion + ')'}"?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, Quitar',
      cancelButtonText: 'No',
      confirmButtonColor: '#dc3545'
    }).then((result) => {
      if (result.value) {
        this.detalles.splice(rowIndex, 1);
        this.detalleIndex = -1;
      }
    });
  }

  sumSubTotal() {
    let sum = 0;
    this.detalles.forEach((d, index) => {
      sum = sum + (d.precioUnitario * d.kilos);
    })
    return sum.toFixed(3);
  }

  get fd() {
    return this.frmDetalle.controls;
  }

  validFD(f, e) {
    return (this.frmDetalle.get(f).touched || this.detalleSubmitted) && this.frmDetalle.hasError(e, f);
  }
}
