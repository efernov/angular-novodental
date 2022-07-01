import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuxiliarService } from 'src/app/service/auxiliar.service';
import { environment } from 'src/environments/environment';
import { Material } from '../models/material';
import { MaterialImpl } from '../models/material-impl';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  private host: string = environment.host;
  private urlEndPoint: string = `${this.host}materiales`;

  constructor(
    private http: HttpClient,
    private auxService: AuxiliarService) { }


  getMateriales(): Observable<any> {
    return this.http.get<any>(this.urlEndPoint);
    }

    findById(id:string): Observable<any> {
      return this.http.get<any>(`${this.urlEndPoint}/${id}` );
    }

  extraerMateriales(respuestaApi: any): Material[] {
    const materiales: Material[] = [];
    if(respuestaApi._embedded.alambres){
    respuestaApi._embedded.alambres.forEach((a: any) => {
      materiales.push(this.mapearMaterial(a, 'alambre'));
      debugger;
    });
  }
  if(respuestaApi._embedded.tornillo){
    respuestaApi._embedded.tornillo.forEach((t: any) => {
      materiales.push(this.mapearMaterial(t, 'tornillo'));
      debugger;
    });
  }
    return materiales;
  }

  mapearMaterial(materialApi: any, tipo:string): MaterialImpl {
    const urlSelf = materialApi._links.self.href;
    console.log(urlSelf);
    const url = urlSelf.split('/');
	  const id =   parseInt(url[url.length -1]);
    debugger;
    let urlTornillo = '';
    let urlAlambre = '';
    if(tipo === 'tornillo'){
      urlTornillo = `${this.host}tornillo/${id}`;
    }else{
      urlAlambre = `${this.host}alambre/${id}`;
    }


  return new MaterialImpl(
    id,
  materialApi.precio,
  materialApi.cantidad,
  // materialApi.diametroMilimetro,
  // materialApi.longitudCentimetro,
  // materialApi.direccionApertura,
  urlAlambre,
  urlTornillo,
  materialApi.ortodoncia,);
  }

  create(material: Material): void {
  console.log(`Se ha creado el Material: ${JSON.stringify(material)}`);
  }

  findMateriaByOrtodoncia(urlMaterial:string):Observable<any> {
    return this.http.get<any>(urlMaterial);
  }

  postOrtodoncia(material: MaterialImpl){
    this.http.post(this.urlEndPoint, material).subscribe();
  }

  deleteMaterial(id: string):Observable<any> {
    const url = `${this.urlEndPoint}/${id}`;
    debugger;
    return this.http.delete<any>(url);
  }

  modificarMaterial(material: MaterialImpl) {
    return this.http.put<any>(`${this.urlEndPoint}/${material.id}`, material);
  }

}
