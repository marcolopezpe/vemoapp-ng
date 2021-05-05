import {Component, OnInit} from '@angular/core';
import {ClienteService} from '../../../services/venta/cliente.service';
import Swal from 'sweetalert2';
import {Cliente} from '../../../models/venta/cliente';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  clientes = [];

  constructor(private clienteService: ClienteService) {
  }

  ngOnInit(): void {
    this.loadClientes();
  }

  loadClientes() {
    this.clienteService.getClientes().subscribe(res => {
      this.clientes = res.result;
    });
  }

  eliminar(row: Cliente) {
    Swal.fire({
      title: 'Eliminar',
      text: `¿Esta seguro eliminar a "${row.razonSocial}"?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar',
      cancelButtonText: 'No',
      confirmButtonColor: '#dc3545'
    }).then((result) => {
      if (result.value) {
        this.clienteService.eliminar(row.id).subscribe(res => {
          this.loadClientes();
          Swal.fire(
            'Eliminado',
            'Registro eliminado correctamente.',
            'success'
          );
        }, (err) => {
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
