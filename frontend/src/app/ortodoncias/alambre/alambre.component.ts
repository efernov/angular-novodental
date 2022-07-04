import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlambreImpl } from '../models/alambre-impl';
import { AlambreService } from '../service/alambre.service';

@Component({
  selector: 'app-alambre',
  templateUrl: './alambre.component.html',
  styleUrls: ['./alambre.component.css']
})
export class AlambreComponent implements OnInit {
  _alambre: AlambreImpl = new AlambreImpl(0, 0, 0, 0, 0, "", "");
  mensaje:string = '';
  alambreId : string = "";

  @Output()
  alambreEvent = new EventEmitter<AlambreImpl>();

  @Input() ortodonciaId: number = 0;

  constructor(
    private alambreService: AlambreService,
    private router: Router) { }

  ngOnInit(): void {
    console.log(this.ortodonciaId);
  }

  @Input('alambre')
  set alambre(alambre: any) {
    debugger;
    if(alambre && alambre.urlAlambre){
      this._alambre = alambre;
    }else{
      this._alambre = new AlambreImpl(0, 0, 0,  0, 0, "", "");
    }
  }

  create(f: NgForm) {
    debugger;
    if(f.valid && f.value.cantidad !==0 && f.value.precio !== 0 && f.value.diametroMilimetro !== 0 && f.value.logitudCentimetro !== 0){
      //servicio de back
      this._alambre.ortodoncia =this.ortodonciaId.toString();

      this.alambreService.postAlambre(this._alambre).subscribe(
        (response) =>{
          debugger;
          this.alambreEvent.emit(this.alambreService.mapearAlambre(response));

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
