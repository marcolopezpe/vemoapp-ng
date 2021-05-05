import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ArticuloService} from '../../../../services/venta/articulo.service';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {UnidadMedidaService} from '../../../../services/venta/unidad-medida.service';
import {Articulo} from '../../../../models/venta/articulo';
import {UnidadMedida} from '../../../../models/venta/unidad-medida';

@Component({
  selector: 'app-articulo-registro',
  templateUrl: './articulo-registro.component.html',
  styleUrls: ['./articulo-registro.component.css']
})
export class ArticuloRegistroComponent implements OnInit {

  frmArticulo: FormGroup;
  submitted = false;
  id: number;

  unidadesMedidas = [];

  constructor(
    private formBuilder: FormBuilder,
    private articuloService: ArticuloService,
    private unidadMedidaService: UnidadMedidaService,
    private toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.unidadMedidaService.getUnidadesMedidas().subscribe(res => {
      this.unidadesMedidas = res.result;
    });

    this.frmArticulo = this.formBuilder.group({
      id: [''],
      codigo: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      descripcion: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
      unidadMedidaId:['', [Validators.required]]
    });

    this.loadArticulo();
  }

  loadArticulo() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
      if (this.id) {
        this.articuloService.getArticuloById(this.id).subscribe(res => {
          this.f.id.setValue(res.result.id);
          this.f.codigo.setValue(res.result.codigo);
          this.f.descripcion.setValue(res.result.descripcion);
          this.f.unidadMedidaId.setValue(res.result.unidadMedida.id);
        });
      }
    });
  }

  guardar(e) {
    e.preventDefault();
    this.submitted = true;

    if (!this.frmArticulo.valid) return;

    const body: Articulo = this.frmArticulo.value;
    body.unidadMedida = new UnidadMedida(this.f.unidadMedidaId.value);

    if (this.id) {
      this.articuloService.actualizar(body).subscribe(res => {
        this.toastrService.success('Registro actualizado correctamente.');
        this.router.navigate(['/articulos']);
      }, (err) => {
        this.toastrService.error('Error al actualizar');
        console.log(err);
      });
    } else {
      this.articuloService.insertar(body).subscribe(res => {
        this.toastrService.success('Registro guardado correctamente.')
        this.router.navigate(['/articulos']);
      }, (err) => {
        this.toastrService.error('Error al registrar');
        console.log(err);
      });
    }
  }


  get f() {
    return this.frmArticulo.controls;
  }

  valid(f, e) {
    return (this.frmArticulo.get(f).touched || this.submitted) && this.frmArticulo.hasError(e, f);
  }

  value(f, e) {
    return this.frmArticulo.get(f).getError(e);
  }
}
