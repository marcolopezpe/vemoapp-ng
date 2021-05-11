import {Cliente} from './cliente';
import {ComprobanteDetalle} from './comprobante-detalle';
import {SerieComprobante} from './serie-comprobante';

export class Comprobante {

  id: number;
  fecha: Date;
  serie: string;
  numero: string;
  cliente: Cliente;
  detalles: ComprobanteDetalle[];
  estado: number;
}
