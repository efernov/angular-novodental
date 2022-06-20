import { Alambre } from "./alambre";

export class AlambreImpl implements Alambre {
  id: number;
  precio: number = 0;
  diametroMilimetro: number = 0;
  longitudCentimetro: number = 0;
  cantidad: number = 0;
  urlAlambre: string = "";

  constructor(id: number, precio: number, diametroMilimetro: number, longitudCentimetro: number, cantidad: number, urlAlambre: string) {
    this.id = id;
    this.precio = precio;
    this.diametroMilimetro = diametroMilimetro;
    this.longitudCentimetro = longitudCentimetro;
    this.cantidad = cantidad;
    this.urlAlambre = urlAlambre;
  }

}
