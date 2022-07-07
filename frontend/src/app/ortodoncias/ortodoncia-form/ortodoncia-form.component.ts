import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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
  materialSeleccionado:any;
  faPencil = faPencil;
  faBasura = faTrashCan;
  importe:string = '';
  @ViewChild('closeTornillo', { static: false }) btCloseTornillo: ElementRef | undefined;
  @ViewChild('closeAlambre', { static: false }) btCloseAlambre: ElementRef | undefined;

  constructor(
    private ortodonciaService: OrtodonciaService,
    private materialService: MaterialService,
    private tornilloService: TornilloService,
    private alambreService: AlambreService,
    private activateRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.ortodoncia.id = this.activateRoute.snapshot.params['id'];
    if(!this.ortodoncia.id){
      this.ortodoncia.id =0;
    }
    if(this.ortodoncia.id != 0){
      this.ortodonciaService.findById(this.ortodoncia.id.toString()).subscribe(
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
    }
  }

  create() {
    const ortAux = new OrtodonciaImpl(parseInt(this.ortodoncia.id.toString()),
      this.ortodoncia.tipoTrabajo,
      this.ortodoncia.fechaSalida+'T00:00:00.00Z',
      this.ortodoncia.fechaEntrada+'T00:00:00.00Z',
      this.ortodoncia.importeOrtodoncia,
      this.ortodoncia.materiales,
      this.ortodoncia.urlOrtodoncia,
      this.ortodoncia.urlMaterial);

      if(this.ortodoncia.id != 0){
        this.ortodonciaService.modificarOrtodoncia(ortAux).subscribe(
          (response) => {
            this.ortodoncia = this.ortodonciaService.mapearOrtodoncia(response);
            this.disabledMaterial = false;
             this.router.navigate(['ortodoncias']);
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

  generateDate(date:string){
    const aux: any = date.split('-');
    const anyo = parseInt(aux[0]);
    const mes = parseInt(aux[1]);
    const dia = parseInt(aux[2]);

    return new Date(anyo, mes-1, dia);
  }

  validarDatefS(event:any, f: NgForm){
    console.log()
    const fechaSalida = event.currentTarget.value;
    const fechaEntrada = f.controls['fechaent'].value;
    this.validate(f, fechaEntrada, fechaSalida);
  }

  validarDatefE(event:any, f: NgForm){
    console.log()
    const fechaSalida = f.controls['fechasal'].value;
    const fechaEntrada = event.currentTarget.value;
    this.validate(f, fechaEntrada, fechaSalida);
  }

  validate(f: NgForm, fechaEntrada:string, fechaSalida:string){
    const fS = this.generateDate(fechaSalida);
    const fE = this.generateDate(fechaEntrada);
    if(fS.getTime() < fE.getTime()){
      f.controls['fechasal'].setErrors({error:'La fecha de salida debe ser posterior a la entrada'});
    }
  }
  listadoMaterial(){
    this.materiales = [];
    this.materialService.findMateriaByOrtodoncia(this.ortodoncia.urlMaterial).subscribe(
      (response)=>{
        this.materiales.push(...this.tornilloService.extraerTornillo(response));
        this.materiales.push(...this.alambreService.extraerAlambre(response));
      },
      (error) => {console.error(error);}
    );

  }
  incluirMaterial(material:any){
    this.listadoMaterial();

      this.ortodonciaService.updateImporte(this.ortodoncia.id.toString()).subscribe(
        (importe) =>{
          debugger;
          this.ortodoncia.importeOrtodoncia  = importe;
        }
      );



    this.btCloseTornillo?.nativeElement.click();
    this.btCloseAlambre?.nativeElement.click();
  }

  eliminarMaterial(id:string){
    this,this.materialService.deleteMaterial(id).subscribe(
      (response) => {
        this.listadoMaterial();
        this.ortodonciaService.updateImporte(this.ortodoncia.id.toString()).subscribe(
          (importe) =>{
            debugger;
            this.ortodoncia.importeOrtodoncia  = importe;
          }
        );
      },
      (error) => {
        console.error(error);
      });
  }



  editarMaterial(material:any){
    this.materialSeleccionado = material;
  }

  nuevoMaterial(){
    this.materialSeleccionado = undefined;
  }

  reset(f: NgForm){
    this.materiales = [];
    f.resetForm();

  }

}
