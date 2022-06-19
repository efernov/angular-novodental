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
  private urlEndPoint: string = `${this.host}ortodoncias`;

  constructor(
  private http: HttpClient,
  private auxService: AuxiliarService) { }

  /* getOrtodoncias(): Observable<Ortodoncia[]> {
    debugger;
  return this.http.get<Ortodoncia[]>(this.urlEndPoint+'/findall');
  } */
  getOrtodoncias(): Observable<any> {
    return this.http.get<any>(this.urlEndPoint);
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
    console.log(urlSelf);
    const url = urlSelf.split('/');
	  const id =   parseInt(url[url.length -1]);

  return new OrtodonciaImpl(
    id,
  ortodonciaApi.tipoTrabajo,
  ortodonciaApi.fechaEntrada,
  ortodonciaApi.fechaSalida,
  ortodonciaApi.importeOrtodoncia,
  ortodonciaApi.urlOrtodoncia,
  ortodonciaApi.materiales);
  }

  create(ortodoncia: Ortodoncia): void {
  console.log(`Se ha creado la ortodoncia: ${JSON.stringify(ortodoncia)}`);
  }

  postOrtodoncia(ortodoncia: OrtodonciaImpl){
    this.http.post(this.urlEndPoint, ortodoncia).subscribe();
  }

  deleteOrtodoncia(id: number):Observable<any> {
    const url = `${this.urlEndPoint}/${id}`;
    debugger;
    return this.http.delete<any>(url);
  }

  patchOrtodoncia(ortodoncia: OrtodonciaImpl) {
    return this.http.patch<any>(`${this.urlEndPoint}/${ortodoncia.id}`, ortodoncia);
  }

  getOrtodonciasPagina(pagina: number): Observable<any> {
  return this.auxService.getItemsPorPagina(this.urlEndPoint, pagina);
  }
}
