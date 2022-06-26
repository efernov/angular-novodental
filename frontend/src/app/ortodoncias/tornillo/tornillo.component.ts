import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TornilloImpl } from '../models/tornillo-impl';
import { TornilloService } from '../service/tornillo.service';

@Component({
  selector: 'app-tornillo',
  templateUrl: './tornillo.component.html',
  styleUrls: ['./tornillo.component.css']
})
export class TornilloComponent implements OnInit {
  tornillo: TornilloImpl = new TornilloImpl(0, 0, 0, "", 0, "");
  mensaje:string = "";
  constructor(private tornilloService: TornilloService) { }

  ngOnInit(): void {
  }

  create(f: NgForm) {
    debugger;
    if(f.valid && f.value.cantidad !==0 && f.value.precio !==0 && f.value.direccionApertura !==0 && f.value.aperturaMilimetros !==0) {
      //servicio de back
      this.tornilloService.postTornillo(this.tornillo);
    }else{
      console.log('datos no valido, revise el formulario');
    }

  }

}
