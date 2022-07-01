import { Material } from "./material";

export class MaterialImpl implements Material {
  id: number = 0;
  precio: number = 0;
  cantidad: number=0;
  diametroMilimetro: number = 0;
  longitudCentimetro: number = 0;
  direccionApertura: string = "";
  aperturaMilimetro: number = 0;
  urlTornillo: string = "";
  urlAlambre:string = '';
  ortodoncia: string = "";


constructor (id:number, precio:number, cantidad:number,urlAlambre:string, urlTornillo: string, ortodoncia:string) {
  this.id = id;
  this.precio = precio;
  this.cantidad =cantidad;
  this.urlAlambre = urlAlambre;
  this.urlTornillo = urlTornillo;
  this.ortodoncia = ortodoncia;

}



}
