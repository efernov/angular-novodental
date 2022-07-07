import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuxiliarService } from 'src/app/service/auxiliar.service';
import { environment } from 'src/environments/environment';
import { Ortodoncia } from '../models/ortodoncia';
import { OrtodonciaImpl } from '../models/ortodoncia-impl';


@Injectable({
  providedIn: 'root'
})
export class OrtodonciaService {

  private host: string = environment.host;
  private hostPer: string = environment.hostPer;
  private urlEndPoint: string = `${this.host}ortodoncias`;

  constructor(
  private http: HttpClient,
  private auxService: AuxiliarService) { }


  getOrtodoncias(): Observable<any> {
    return this.http.get<any>(this.urlEndPoint);
    }

  findById(id:string): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}/${id}` );
  }

  updateImporte(id:string): Observable<number>{
  return this.http.get<any>(`${this.hostPer}ortodoncia/importe?id=${id}` );
  }

  extraerOrtodoncias(respuestaApi: any): Ortodoncia[] {
  const ortodoncias: Ortodoncia[] = [];
  respuestaApi._embedded.ortodoncias.forEach((p: any) => {
  ortodoncias.push(this.mapearOrtodoncia(p));
  });
  return ortodoncias;
  }

  mapearOrtodoncia(ortodonciaApi: any): OrtodonciaImpl {
    const urlSelf = ortodonciaApi._links.self.href;
    const url = urlSelf.split('/');
	  const id =   parseInt(url[url.length -1]);
    const urlMaterial = ortodonciaApi._links.materiales.href;
    const fechaSal = ortodonciaApi.fechaSalida.split('T')[0];
    const fechaEnt = ortodonciaApi.fechaEntrada.split('T')[0];
  return new OrtodonciaImpl(
    id,
  ortodonciaApi.tipoTrabajo,
  fechaSal,
  fechaEnt,
  ortodonciaApi.importeOrtodoncia,
  ortodonciaApi.urlOrtodoncia,
  ortodonciaApi.materiales,
  urlMaterial);
  }

  create(ortodoncia: Ortodoncia): void {
  console.log(`Se ha creado la ortodoncia: ${JSON.stringify(ortodoncia)}`);
  }

  postOrtodoncia(ortodoncia: OrtodonciaImpl):Observable<any>{
    return this.http.post<any>(this.urlEndPoint, ortodoncia);
  }

  deleteOrtodoncia(id: number):Observable<any> {
    const url = `${this.urlEndPoint}/${id}`;
    return this.http.delete<any>(url);
  }

  modificarOrtodoncia(ortodoncia: OrtodonciaImpl) {
    return this.http.put<any>(`${this.urlEndPoint}/${ortodoncia.id}`, ortodoncia);
  }

}
