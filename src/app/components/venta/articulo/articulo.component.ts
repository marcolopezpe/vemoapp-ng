import {Component, OnInit} from '@angular/core';
import {ArticuloService} from '../../../services/venta/articulo.service';
import Swal from 'sweetalert2';
import {Articulo} from '../../../models/venta/articulo';

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.css']
})
export class ArticuloComponent implements OnInit {

  articulos = [];

  constructor(private articuloService: ArticuloService) {
  }

  ngOnInit(): void {
    this.loadArticulos();
  }

  loadArticulos() {
    this.articuloService.getArticulos().subscribe(res => {
      this.articulos = res.result;
    })
  }

  eliminar(row: Articulo) {
    Swal.fire({
      title: 'Eliminar',
      text: `¿Esta seguro eliminar el articulo "${row.codigo}"?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar',
      cancelButtonText: 'No',
      confirmButtonColor: '#dc3545'
    }).then((result) => {
      if (result.value) {
        this.articuloService.eliminar(row.id).subscribe(res => {
          this.loadArticulos();
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
