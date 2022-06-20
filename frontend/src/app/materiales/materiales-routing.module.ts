import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlambreComponent } from './alambre/alambre.component';
import { MaterialFormComponent } from './material-form/material-form.component';
import { MaterialesComponent } from './materiales/materiales.component';
import { TornilloComponent } from './tornillo/tornillo.component';

const routes: Routes = [
  {
    path: "",
    component: MaterialesComponent,
  },
  {
    path: "formulario",
    component: MaterialFormComponent
  },
  {
    path: "tornillo",
    component: TornilloComponent
  },
  {
    path: "alambre",
    component: AlambreComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaterialesRoutingModule { }
