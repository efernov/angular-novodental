import { Tornillo } from "./tornillo";

export class TornilloImpl implements Tornillo {
  id: number = 0;
  precio: number = 0;
  aperturaMilimetros: number = 0;
  direccionApertura: string = "";
  cantidad: number = 0;
  urlTornillo: string = "";
  ortodoncia: string = "";

constructor(id: number, precio: number, aperturaMilimetros: number, direccionApertura: string, cantidad: number, urlTornillo: string, ortodoncia: string) {
      this.id = id;
      this.precio = precio;
      this.aperturaMilimetros = aperturaMilimetros;
      this.direccionApertura = direccionApertura;
      this.cantidad = cantidad;
      this.urlTornillo = urlTornillo;
      this.ortodoncia = ortodoncia;
  }
}
