import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrtodonciaRoutingModule } from './ortodoncia-routing.module';
import { OrtodonciaComponent } from './ortodoncia/ortodoncia.component';
import { AlambreComponent } from './ortodoncia/alambre/alambre.component';
import { TornilloComponent } from './ortodoncia/tornillo/tornillo.component';


@NgModule({
  declarations: [
    OrtodonciaComponent,
    AlambreComponent,
    TornilloComponent
  ],
  imports: [
    CommonModule,
    OrtodonciaRoutingModule
  ]
})
export class OrtodonciaModule { }
