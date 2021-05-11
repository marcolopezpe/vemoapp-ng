import {Component, OnInit} from '@angular/core';
import {ArticuloService} from '../../services/venta/articulo.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  stocks = [];

  constructor(private articuloService: ArticuloService) {
  }

  ngOnInit(): void {
    this.loadFinalStocks();
  }

  public loadFinalStocks() {
    this.articuloService.getFinalStocks().subscribe(res => {
      this.stocks = res.result;
    });
  }
}
