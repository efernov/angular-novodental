import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { faPencil, faRuble, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { MaterialService } from 'src/app/materiales/service/material.service';
import { OrtodonciaImpl } from '../models/ortodoncia-impl';
import { AlambreService } from '../service/alambre.service';
import { OrtodonciaService } from '../service/ortodoncia.service';
import { TornilloService } from '../service/tornillo.service';

@Component({
  selector: 'app-ortodoncia-form',
  templateUrl: './ortodoncia-form.component.html',
  styleUrls: ['./ortodoncia-form.component.css']
})
export class OrtodonciaFormComponent implements OnInit {
  ortodoncia: OrtodonciaImpl = new OrtodonciaImpl(0, '', '', '', 0, [], '', '');
  disabledMaterial:boolean = true;
  materiales:any[]=[];
  ortodonciaId:string='';
  materialSeleccionado:any;
  faPencil = faPencil;
  faBasura = faTrashCan;
  @ViewChild('closeTornillo', { static: false }) btCloseTornillo: ElementRef | undefined;
  @ViewChild('closeAlambre', { static: false }) btCloseAlambre: ElementRef | undefined;

  constructor(
    private ortodonciaService: OrtodonciaService,
    private materialService: MaterialService,
    private tornilloService: TornilloService,
    private alambreService: AlambreService,
    private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.ortodonciaId = this.activateRoute.snapshot.params['id'];
    if(this.ortodonciaId){
      this.ortodonciaService.findById(this.ortodonciaId).subscribe(
        (response)=>{
          this.ortodoncia = this.ortodonciaService.mapearOrtodoncia(response);
          // Lista de materiales
          this.disabledMaterial=false;
          this.listadoMaterial();
        },
        (error)=>    {
          console.error(error);
        }
      );
    }else{
      this.ortodonciaId = '-1';
    }
  }

  create() {
    debugger;
    const ortAux = new OrtodonciaImpl(parseInt(this.ortodonciaId),
      this.ortodoncia.tipoTrabajo,
      this.ortodoncia.fechaSalida+'T00:00:00.00Z',
      this.ortodoncia.fechaEntrada+'T00:00:00.00Z',
      this.ortodoncia.importeOrtodoncia,
      this.ortodoncia.materiales,
      this.ortodoncia.urlOrtodoncia,
      this.ortodoncia.urlMaterial);
      if(this.ortodonciaId){
        this.ortodonciaService.modificarOrtodoncia(ortAux).subscribe(
          (response) => {
            this.ortodoncia = this.ortodonciaService.mapearOrtodoncia(response);
            debugger;
            this.disabledMaterial = false;
          },
          (error) => {
            console.error(error);
          });
      }else{
        this.ortodonciaService.postOrtodoncia(ortAux).subscribe(
          (response) => {
            this.ortodoncia = this.ortodonciaService.mapearOrtodoncia(response);
            this.disabledMaterial = false;
          },
          (error) => {
            console.error(error);
          });
    }
  }

  incluirMaterial(material:any){
    this.listadoMaterial();
    this.btCloseTornillo?.nativeElement.click();
    this.btCloseAlambre?.nativeElement.click();
  }

  eliminarMaterial(id:string){
    this,this.materialService.deleteMaterial(id).subscribe(
      (response) => {
        this.listadoMaterial();
      },
      (error) => {
        console.error(error);
      });
  }

  listadoMaterial(){
    this.materiales = [];
    this.materialService.findMateriaByOrtodoncia(this.ortodoncia.urlMaterial).subscribe(
      (response)=>{
        this.materiales.push(...this.tornilloService.extraerTornillo(response));
        this.materiales.push(...this.alambreService.extraerAlambre(response));

        debugger;
        let precioTotal =0;
        this.materiales.forEach(m => {
          precioTotal+=m.precio * m.cantidad;
        });
        this.ortodoncia.importeOrtodoncia = precioTotal;
      },

      (error) => {console.error(error);}
    );
  }

  editarMaterial(material:any){
    this.materialSeleccionado = material;
  }

  nuevoMaterial(){
    this.materialSeleccionado = undefined;
  }

  reset(){
    this.materiales = [];

  }

}
