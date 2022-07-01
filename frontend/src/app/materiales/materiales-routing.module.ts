import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MaterialFormComponent } from './material-form/material-form.component';
import { MaterialesComponent } from './materiales/materiales.component';


const routes: Routes = [
  {
    path: "",
    component: MaterialesComponent,
  },
  {
    path: "formulario",
    component: MaterialFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaterialesRoutingModule { }
