import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ClienteService} from '../../../../services/venta/cliente.service';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Cliente} from '../../../../models/venta/cliente';

@Component({
  selector: 'app-cliente-registro',
  templateUrl: './cliente-registro.component.html',
  styleUrls: ['./cliente-registro.component.css']
})
export class ClienteRegistroComponent implements OnInit {

  frmCliente: FormGroup;
  submitted = false;
  id: number;

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.frmCliente = this.formBuilder.group({
      id: [''],
      razonSocial: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      tipoDocumento: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]],
      numeroDocumento: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      direccion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      nombreContacto: [''],
      emailContacto: ['']
    });

    this.loadCliente();
  }

  loadCliente() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
      if (this.id) {
        this.clienteService.getClienteById(this.id).subscribe(res => {
          this.f.id.setValue(res.result.id);
          this.f.razonSocial.setValue(res.result.razonSocial);
          this.f.tipoDocumento.setValue(res.result.tipoDocumento);
          this.f.numeroDocumento.setValue(res.result.numeroDocumento);
          this.f.direccion.setValue(res.result.direccion);
          this.f.nombreContacto.setValue(res.result.nombreContacto);
          this.f.emailContacto.setValue(res.result.emailContacto);
        });
      }
    });
  }

  guardar(e) {
    e.preventDefault();
    this.submitted = true;

    if (!this.frmCliente.valid) return;
    const body: Cliente = this.frmCliente.value;

    if (this.id) {
      this.clienteService.actualizar(body).subscribe(res => {
        this.toastrService.success('Registro actualizado correctamente.');
        this.router.navigate(['/clientes']);
      }, (err) => {
        this.toastrService.error('Error al actualizar');
        console.log(err);
      });
    } else {
      this.clienteService.insertar(body).subscribe(res => {
        this.toastrService.success('Registro guardado correctamente.')
        this.router.navigate(['/clientes']);
      }, (err) => {
        this.toastrService.error('Error al registrar');
        console.log(err);
      });
    }
  }

  get f() {
    return this.frmCliente.controls;
  }

  valid(f, e) {
    return (this.frmCliente.get(f).touched || this.submitted) && this.frmCliente.hasError(e, f);
  }

  value(f, e) {
    return this.frmCliente.get(f).getError(e);
  }
}
