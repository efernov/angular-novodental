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
  private urlEndPoint: string = `${this.host}tornillo`;

  constructor(
  private http: HttpClient,
  private auxService: AuxiliarService) { }

  /* getTornillo(): Observable<Tornillo[]> {
    debugger;
  return this.http.get<Tornillo[]>(this.urlEndPoint+'/findall');
  } */
  getTornillo(): Observable<any> {
    return this.http.get<any>(this.urlEndPoint);
    }

  extraerTornillo(respuestaApi: any): Tornillo[] {
  const tornillos: Tornillo[] = [];
  respuestaApi._embedded.tornillos.forEach((p: any) => {
  tornillos.push(this.mapearTornillo(p));

  });
  return tornillos;
  }

  mapearTornillo(tornilloApi: any): TornilloImpl {
    const urlSelf = tornilloApi._links.self.href;
    console.log(urlSelf);
    const url = urlSelf.split('/');
	  const id =   parseInt(url[url.length -1]);

  return new TornilloImpl(
    id,
  tornilloApi.precio,
  tornilloApi.aperturaMilimetros,
  tornilloApi.direccionApertura,
  tornilloApi.cantidad,
  tornilloApi.urlTornillo);
  }

  create(tornillo: Tornillo): void {
  console.log(`Se ha creado un Tornillo: ${JSON.stringify(tornillo)}`);
  }

  postTornillo(tornillo: TornilloImpl){
    this.http.post(this.urlEndPoint, tornillo).subscribe();
  }

  deleteTornillo(id: number):Observable<any> {
    const url = `${this.urlEndPoint}/${id}`;
    debugger;
    return this.http.delete<any>(url);
  }

  patchTornillo(tornillo: TornilloImpl) {
    return this.http.patch<any>(`${this.urlEndPoint}/${tornillo.id}`, tornillo);
  }

  getTornilloPagina(pagina: number): Observable<any> {
  return this.auxService.getItemsPorPagina(this.urlEndPoint, pagina);
  }

}
