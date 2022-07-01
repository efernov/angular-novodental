import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuxiliarService } from 'src/app/service/auxiliar.service';
import { environment } from 'src/environments/environment';
import { Tornillo } from '../models/tornillo';
import { TornilloImpl } from '../models/tornillo-impl';

@Injectable({
  providedIn: 'root'
})
export class TornilloService {

  private host: string = environment.host;
  private urlTornillos: string = `${this.host}tornillos`;
  private urlOrtodoncia: string = `${this.host}ortodoncia/`;

  constructor(
  private http: HttpClient,
  private auxService: AuxiliarService) { }

  /* getTornillo(): Observable<Tornillo[]> {
    debugger;
  return this.http.get<Tornillo[]>(this.urlEndPoint+'/findall');
  } */
  getTornillo(): Observable<any> {
    return this.http.get<any>(this.urlTornillos);
    }

  extraerTornillo(respuestaApi: any): Tornillo[] {
  const tornillos: Tornillo[] = [];
  if(respuestaApi._embedded.tornillo){
    respuestaApi._embedded.tornillo.forEach((p: any) => {
    tornillos.push(this.mapearTornillo(p));

    });
  }
  return tornillos;
  }

  mapearTornillo(tornilloApi: any): TornilloImpl {
    const urlSelf = tornilloApi._links.self.href;
    const url = urlSelf.split('/');
	  const id =   parseInt(url[url.length -1]);

  return new TornilloImpl(
    id,
  tornilloApi.precio,
  tornilloApi.aperturaMilimetros,
  tornilloApi.direccionApertura,
  tornilloApi.cantidad,
  tornilloApi._links.tornillo.href,
  tornilloApi._links.ortodoncia.href);
  }

  postTornillo(tornillo: TornilloImpl): Observable<any> {
    debugger;
    tornillo.ortodoncia = this.urlOrtodoncia + tornillo.ortodoncia;
    return this.http.post<any>(this.urlTornillos, tornillo);
  }

  deleteTornillo(id: number):Observable<any> {
    const url = `${this.urlTornillos}/${id}`;
    debugger;
    return this.http.delete<any>(url);
  }

  modificarTornillo(tornillo: TornilloImpl) {
    return this.http.put<any>(`${this.urlTornillos}/${tornillo.id}`, tornillo);
  }

  getTornilloPagina(pagina: number): Observable<any> {
  return this.auxService.getItemsPorPagina(this.urlTornillos, pagina);
  }

}
