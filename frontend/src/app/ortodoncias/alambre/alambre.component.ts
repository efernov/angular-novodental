import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlambreImpl } from '../models/alambre-impl';
import { AlambreService } from '../service/alambre.service';

@Component({
  selector: 'app-alambre',
  templateUrl: './alambre.component.html',
  styleUrls: ['./alambre.component.css']
})
export class AlambreComponent implements OnInit {
  alambre: AlambreImpl = new AlambreImpl(0, 0, 0, 0, 0, "");
  mensaje:string = '';
  constructor(private alambreService: AlambreService) { }

  ngOnInit(): void {
  }

  create(f: NgForm) {
    debugger;
    if(f.valid && f.value.cantidad !==0 && f.value.precio !== 0 && f.value.diametroMilimetro !== 0 && f.value.logitudCentimetro !== 0){
      //servicio de back
      this.alambreService.postAlambre(this.alambre);
    }else{
      console.log('datos no valido, revise el formulario');
    }

  }

}
