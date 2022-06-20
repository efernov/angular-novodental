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

/* getMateriales(): Observable<Material[]> {
    debugger;
  return this.http.get<Material[]>(this.urlEndPoint+'/findall');
  } */
  getMateriales(): Observable<any> {
    return this.http.get<any>(this.urlEndPoint);
    }

  extraerMateriales(respuestaApi: any): Material[] {
  const materiales: Material[] = [];
  respuestaApi._embedded.material.forEach((p: any) => {
  materiales.push(this.mapearMaterial(p));

  });
  return materiales;
  }

  mapearMaterial(materialApi: any): MaterialImpl {
    const urlSelf = materialApi._links.self.href;
    console.log(urlSelf);
    const url = urlSelf.split('/');
	  const id =   parseInt(url[url.length -1]);

  return new MaterialImpl(
    id,
  materialApi.precio,
  materialApi.ortodoncia,
  materialApi.urlMaterial,
  materialApi.tipoMaterial);
  }

  create(material: Material): void {
  console.log(`Se ha creado el Material: ${JSON.stringify(material)}`);
  }

  postOrtodoncia(material: MaterialImpl){
    this.http.post(this.urlEndPoint, material).subscribe();
  }

  deleteMaterial(id: number):Observable<any> {
    const url = `${this.urlEndPoint}/${id}`;
    debugger;
    return this.http.delete<any>(url);
  }

  patchMaterial(material: MaterialImpl) {
    return this.http.patch<any>(`${this.urlEndPoint}/${material.id}`, material);
  }

  getMaterialPagina(pagina: number): Observable<any> {
  return this.auxService.getItemsPorPagina(this.urlEndPoint, pagina);
  }


}
