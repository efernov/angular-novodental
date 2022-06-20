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
  private urlEndPoint: string = `${this.host}alambre`;


  constructor(
  private http: HttpClient,
  private auxService: AuxiliarService) { }

/* getAlambre(): Observable<Alambre[]> {
    debugger;
  return this.http.get<Alambre[]>(this.urlEndPoint+'/findall');
  } */
  getAlambre(): Observable<any> {
    return this.http.get<any>(this.urlEndPoint);
    }

  extraerAlambre(respuestaApi: any): Alambre[] {
  const alambres: Alambre[] = [];
  respuestaApi._embedded.alambres.forEach((p: any) => {
  alambres.push(this.mapearAlambre(p));

  });
  return alambres;
  }

  mapearAlambre(alambreApi: any): AlambreImpl {
    const urlSelf = alambreApi._links.self.href;
    console.log(urlSelf);
    const url = urlSelf.split('/');
	  const id =   parseInt(url[url.length -1]);

  return new AlambreImpl(
    id,
  alambreApi.precio,
  alambreApi.diametroMilimetro,
  alambreApi.longitudCentimetro,
  alambreApi.cantidad,
  alambreApi.urlAlambre);
  }

  create(alambre: Alambre): void {
  console.log(`Se ha creado un Alambre: ${JSON.stringify(alambre)}`);
  }

  postAlambre(alambre: AlambreImpl){
    this.http.post(this.urlEndPoint, alambre).subscribe();
  }

  deleteAlambre(id: number):Observable<any> {
    const url = `${this.urlEndPoint}/${id}`;
    debugger;
    return this.http.delete<any>(url);
  }

  patchAlambre(alambre: AlambreImpl) {
    return this.http.patch<any>(`${this.urlEndPoint}/${alambre.id}`, alambre);
  }

  getAlambresPagina(pagina: number): Observable<any> {
  return this.auxService.getItemsPorPagina(this.urlEndPoint, pagina);
  }




}
