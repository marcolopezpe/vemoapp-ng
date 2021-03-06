import {Articulo} from './articulo';
import {ComprobanteDetalle} from './comprobante-detalle';

export class Movimiento {

  id: number;
  fecha: Date;
  articulo: Articulo;
  tipo: string;
  cantidad: number;
  kilos: number;
  estado: number;
}
