import {Articulo} from './articulo';
import {Comprobante} from './comprobante';

export class ComprobanteDetalle {

  id: number;
  articulo: Articulo;
  precioUnitario: number;
  cantidad: number;
  kilos: number;
  estado: number;
}
