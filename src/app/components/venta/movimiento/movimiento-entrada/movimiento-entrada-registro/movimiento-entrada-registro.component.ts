import {Component, OnInit, TemplateRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {MovimientoService} from '../../../../../services/venta/movimiento.service';
import {ArticuloService} from '../../../../../services/venta/articulo.service';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Params, Router} from '@angular/router';
import Utils from '../../../../../models/shared/utils';
import {Articulo} from '../../../../../models/venta/articulo';
import {Movimiento} from '../../../../../models/venta/movimiento';

@Component({
  selector: 'app-movimiento-entrada-registro',
  templateUrl: './movimiento-entrada-registro.component.html',
  styleUrls: ['./movimiento-entrada-registro.component.css']
})
export class MovimientoEntradaRegistroComponent implements OnInit {

  frmMovimientoEntrada: FormGroup;
  submitted = false;
  id: number;
  title: string;

  articulosModalRef: BsModalRef;
  articulos = [];

  constructor(
    private formBuilder: FormBuilder,
    private movimientoService: MovimientoService,
    private articuloService: ArticuloService,
    private toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modalService: BsModalService
  ) {
  }

  ngOnInit(): void {
    this.frmMovimientoEntrada = this.formBuilder.group({
      id: [''],
      fecha: [Utils.extractDateOf(new Date()), [Validators.required]],
      articuloId: ['', [Validators.required]],
      articulo: [''],
      cantidad: ['', [Validators.required, Validators.pattern(/^[.\d]+$/)]],
      kilos: ['', [Validators.required,Validators.pattern(/^[.\d]+$/)]]
    });

    this.loadMovimientoEntrada();
  }

  loadMovimientoEntrada() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
      if (this.id) {
        this.movimientoService.getMovimientoById(this.id).subscribe(res => {
          this.f.id.setValue(res.result.id);
          this.f.fecha.setValue(Utils.stringToDate(res.result.fecha));
          this.f.articuloId.setValue(res.result.articulo.id);
          this.f.articulo.setValue(res.result.articulo.codigo + ' / ' + res.result.articulo.descripcion + ' / ' + res.result.articulo.unidadMedida.nombre);
          this.f.cantidad.setValue(res.result.cantidad);
          this.f.kilos.setValue(res.result.kilos);
          this.title = 'Editar Entrada';
        });
      } else {
        this.title = 'Nueva Entrada';
      }
    });
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
    this.f.articuloId.setValue(row.id);
    this.f.articulo.setValue(row.codigo + ' / ' + row.descripcion + ' / ' + row.unidadMedida.nombre);
    this.articulosModalRef.hide();
  }

  guardarEntrada(e) {
    e.preventDefault();
    this.submitted = true;

    if (!this.frmMovimientoEntrada.valid) return;
    const body: Movimiento = this.frmMovimientoEntrada.value;
    body.articulo = new Articulo(this.f.articuloId.value);
    body.tipo = 'E';

    if (this.id) {
      this.movimientoService.actualizar(body).subscribe(res => {
        this.toastrService.success('Registro actualizado correctamente.');
        this.router.navigate(['/entradas']);
      }, (err) => {
        this.toastrService.error('Error al actualizar');
        console.log(err);
      });
    } else {
      this.movimientoService.insertar(body).subscribe(res => {
        this.toastrService.success('Registro guardado correctamente.')
        this.router.navigate(['/entradas']);
      }, (err) => {
        this.toastrService.error('Error al registrar');
        console.log(err);
      });
    }
  }

  get f() {
    return this.frmMovimientoEntrada.controls;
  }

  valid(f, e) {
    return (this.frmMovimientoEntrada.get(f).touched || this.submitted) && this.frmMovimientoEntrada.hasError(e, f);
  }

  value(f, e) {
    return this.frmMovimientoEntrada.get(f).getError(e);
  }
}
