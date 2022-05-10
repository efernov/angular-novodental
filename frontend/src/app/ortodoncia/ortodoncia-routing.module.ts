import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlambreComponent } from './ortodoncia/alambre/alambre.component';
import { OrtodonciaComponent } from './ortodoncia/ortodoncia.component';
import { TornilloComponent } from './ortodoncia/tornillo/tornillo.component';

const routes: Routes = [

  {
    path: "",
    component: OrtodonciaComponent,
    children: [
      {
        path: "alambre",
        component: AlambreComponent,
      },
      {
        path: "tornillo",
        component: TornilloComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrtodonciaRoutingModule { }
