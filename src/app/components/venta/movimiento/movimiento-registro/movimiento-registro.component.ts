import {Component, OnInit, TemplateRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MovimientoService} from '../../../../services/venta/movimiento.service';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Movimiento} from '../../../../models/venta/movimiento';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {ArticuloService} from '../../../../services/venta/articulo.service';
import {Articulo} from '../../../../models/venta/articulo';
import * as moment from 'moment';
import Utils from '../../../../models/shared/utils';

@Component({
  selector: 'app-movimiento-registro',
  templateUrl: './movimiento-registro.component.html',
  styleUrls: ['./movimiento-registro.component.css']
})
export class MovimientoRegistroComponent implements OnInit {

  frmMovimiento: FormGroup;
  submitted = false;
  id: number;

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

    this.frmMovimiento = this.formBuilder.group({
      id: [''],
      fecha: [Utils.extractDateOf(new Date()), [Validators.required]],
      articuloId: ['', [Validators.required]],
      articulo: [''],
      tipo: ['E', [Validators.required]],
      cantidad: ['', [Validators.required, Validators.pattern(/^[.\d]+$/)]],
      kilos: ['', [Validators.required,Validators.pattern(/^[.\d]+$/)]]
    });

    this.loadMovimiento();
  }

  loadMovimiento() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
      if (this.id) {
        this.movimientoService.getMovimientoById(this.id).subscribe(res => {
          this.f.id.setValue(res.result.id);
          this.f.fecha.setValue(Utils.stringToDate(res.result.fecha));
          this.f.articuloId.setValue(res.result.articulo.id);
          this.f.articulo.setValue(res.result.articulo.codigo + ' / ' + res.result.articulo.descripcion);
          this.f.tipo.setValue(res.result.tipo);
          this.f.cantidad.setValue(res.result.cantidad);
          this.f.kilos.setValue(res.result.kilos);
        });
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

  seleccionarArticulo(row) {
    this.f.articuloId.setValue(row.id);
    this.f.articulo.setValue(row.codigo + ' / ' + row.descripcion);
    this.articulosModalRef.hide();
  }

  guardar(e) {
    e.preventDefault();
    this.submitted = true;

    if (!this.frmMovimiento.valid) return;
    const body: Movimiento = this.frmMovimiento.value;
    body.articulo = new Articulo(this.f.articuloId.value);

    if (this.id) {
      this.movimientoService.actualizar(body).subscribe(res => {
        this.toastrService.success('Registro actualizado correctamente.');
        this.router.navigate(['/movimientos']);
      }, (err) => {
        this.toastrService.error('Error al actualizar');
        console.log(err);
      });
    } else {
      this.movimientoService.insertar(body).subscribe(res => {
        this.toastrService.success('Registro guardado correctamente.')
        this.router.navigate(['/movimientos']);
      }, (err) => {
        this.toastrService.error('Error al registrar');
        console.log(err);
      });
    }
  }

  get f() {
    return this.frmMovimiento.controls;
  }

  valid(f, e) {
    return (this.frmMovimiento.get(f).touched || this.submitted) && this.frmMovimiento.hasError(e, f);
  }

  value(f, e) {
    return this.frmMovimiento.get(f).getError(e);
  }
}
