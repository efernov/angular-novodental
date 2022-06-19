import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialesRoutingModule } from './materiales-routing.module';
import { MaterialesComponent } from './materiales/materiales.component';
import { MaterialFormComponent } from './material-form/material-form.component';
import { MaterialItemComponent } from './material-item/material-item.component';
import { CoreModule } from '../core/core.module';
import { HomeModule } from '../home/home.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MaterialesComponent,
    MaterialFormComponent,
    MaterialItemComponent
  ],
  imports: [
    CommonModule,
    MaterialesRoutingModule,
    CoreModule,
    HomeModule,
    FormsModule
  ],
  exports: [],
  providers: []
})
export class MaterialesModule { }
