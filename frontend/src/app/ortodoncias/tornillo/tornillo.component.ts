import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TornilloImpl } from '../models/tornillo-impl';
import { TornilloService } from '../service/tornillo.service';

@Component({
  selector: 'app-tornillo',
  templateUrl: './tornillo.component.html',
  styleUrls: ['./tornillo.component.css']
})
export class TornilloComponent implements OnInit {
  _tornillo: TornilloImpl = new TornilloImpl(0, 0, 0, "", 0, "", "");
  mensaje:string = "";
  tornilloId: string = "";

@Output()
tornilloEvent = new EventEmitter<TornilloImpl>();

@Input() ortodonciaId: number = 0;


  constructor(
    private tornilloService: TornilloService,
    private router: Router) { }

  ngOnInit(): void {
    debugger;
    console.log(this.ortodonciaId);
  }

  @Input('tornillo')
  set tornillo(tornillo: any) {
    debugger;
    if(tornillo && tornillo.urlTornillo){
      this._tornillo = tornillo;
    }else{
      this._tornillo = new TornilloImpl(0, 0, 0, "", 0, "", "");
    }
  }

  create(f: NgForm) {
    debugger;
    if(f.valid && f.value.cantidad !==0 && f.value.precio !==0 && f.value.direccionApertura !==0 && f.value.aperturaMilimetros !==0) {
      //servicio de back
      this._tornillo.ortodoncia = this.ortodonciaId.toString();

      this.tornilloService.postTornillo(this._tornillo).subscribe(
        (response) =>{
          debugger;
          this.tornilloEvent.emit(this.tornilloService.mapearTornillo(response));

          if(this.ortodonciaId){
            this.router.navigate([`ortodoncias/formulario/${this.ortodonciaId}`]);
          }else{
            this.router.navigate(['ortodoncias/formulario']);
          }
        },
        (error) => {
          console.error(error);
        }
      );

    }else{
      console.log('datos no valido, revise el formulario');
    }

  }

}
