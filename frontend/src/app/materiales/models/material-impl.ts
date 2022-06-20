import { Material } from "./material";

export class MaterialImpl implements Material {
  id: number = 0;
  precio: number = 0;
  urlMaterial: string = "";
  ortodoncia: string = "";


constructor (id:number, precio:number, urlMaterial:string, ortodoncia:string) {
  this.id = id;
  this.precio = precio;
  this.urlMaterial = urlMaterial;
  this.ortodoncia = ortodoncia;

}
getIdMaterial(urlMaterial: string): string {
  //urlServicio = urlServicio.slice(0, urlServicio.length - 1)
  return urlMaterial.slice(urlMaterial.lastIndexOf('/') + 1, urlMaterial.length);
}



}
