import { InstantiateExpr } from "@angular/compiler";

export interface Ortodoncia {
  id: number;
  tipoTrabajo: string;
  fechaEntrada: string;
  fechaSalida: string;
  importeOrtodoncia: number;
  materiales: any[];
  urlOrtodoncia: string;
  urlMaterial: string;
}
