export class Cliente {

  id: number;
  razonSocial: string;
  tipoDocumento: string;
  numeroDocumento: string;
  direccion: string;
  nombreContacto: string;
  emailContacto: string;
  estado: number;

  constructor(id: number) {
    this.id = id;
  }
}
