import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuxiliarService } from 'src/app/service/auxiliar.service';
import { environment } from 'src/environments/environment';
import { Alambre } from '../models/alambre';
import { AlambreImpl } from '../models/alambre-impl';

@Injectable({
  providedIn: 'root'
})
export class AlambreService {

  private host: string = environment.host;
  private urlAlambres: string = `${this.host}alambres`;
  private urlOrtodoncia: string = `${this.host}ortodoncia/`;


  constructor(
  private http: HttpClient,
  private auxService: AuxiliarService) { }

/* getAlambre(): Observable<Alambre[]> {
    debugger;
  return this.http.get<Alambre[]>(this.urlEndPoint+'/findall');
  } */
  getAlambre(): Observable<any> {
    return this.http.get<any>(this.urlAlambres);
    }

  extraerAlambre(respuestaApi: any): Alambre[] {
    const alambres: Alambre[] = [];
    if(respuestaApi._embedded.alambres){
      respuestaApi._embedded.alambres.forEach((p: any) => {
        alambres.push(this.mapearAlambre(p));
      });
    }
    return alambres;
  }

  mapearAlambre(alambreApi: any): AlambreImpl {
    const urlSelf = alambreApi._links.self.href;
    const url = urlSelf.split('/');
	  const id =   parseInt(url[url.length -1]);
debugger;
  return new AlambreImpl(
    id,
  alambreApi.precio,
  alambreApi.diametroMilimetro,
  alambreApi.longitudCentimetro,
  alambreApi.cantidad,
  alambreApi._links.alambre.href,
  alambreApi._links.ortodoncia.href);
  }

  postAlambre(alambre: AlambreImpl): Observable<any>{
    debugger;
    alambre.ortodoncia=  this.urlOrtodoncia+alambre.ortodoncia;
    return this.http.post<any>(this.urlAlambres, alambre);
  }

  deleteAlambre(id: number):Observable<any> {
    const url = `${this.urlAlambres}/${id}`;
    debugger;
    return this.http.delete<any>(url);
  }

  modificarAlambre(alambre: AlambreImpl) {
    return this.http.put<any>(`${this.urlAlambres}/${alambre.id}`, alambre);
  }

  getAlambresPagina(pagina: number): Observable<any> {
  return this.auxService.getItemsPorPagina(this.urlAlambres, pagina);
  }

}
