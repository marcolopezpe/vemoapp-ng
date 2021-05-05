import {UnidadMedida} from './unidad-medida';

export class Articulo {

  id: number;
  codigo: string;
  descripcion: string;
  unidadMedida: UnidadMedida;
  estado: number;
}
