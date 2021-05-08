import {Articulo} from './articulo';

export class Movimiento {

  id: number;
  fecha: Date;
  articulo: Articulo;
  tipo: string;
  cantidad: number;
  kilos: number;
  estado: number;
}
