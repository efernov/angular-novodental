import { Ortodoncia } from "./ortodoncia";

export class OrtodonciaImpl implements Ortodoncia {
  id: number = 0;
  tipoTrabajo: string = "";
  fechaEntrada: string = "";
  fechaSalida: string = "";
  importeOrtodoncia: number = 0;
  materiales: any = [];
  urlOrtodoncia: string = "";
  urlMaterial: string ='';

  constructor (id:number,
    tipoTrabajo:string,
    fechaSalida:string,
    fechaEntrada:string,
     importeOrtodoncia:number,
     materiales:any[],
    urlOrtodoncia:string,
    urlMaterial:string) {
    this.id = id;
    this.tipoTrabajo = tipoTrabajo;
    this.fechaEntrada = fechaEntrada;
    this.fechaSalida = fechaSalida;
    this.importeOrtodoncia = importeOrtodoncia;
    this.materiales = materiales;
    this.urlOrtodoncia = urlOrtodoncia;
    this.urlMaterial = urlMaterial;
  }


}
