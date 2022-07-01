import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlambreComponent } from './alambre/alambre.component';
import { OrtodonciaFormComponent } from './ortodoncia-form/ortodoncia-form.component';
import { OrtodonciasComponent } from './ortodoncias/ortodoncias.component';
import { TornilloComponent } from './tornillo/tornillo.component';


const routes: Routes = [
  {
    path: "",
    component: OrtodonciasComponent,
  },
  {
    path: "formulario",
    component: OrtodonciaFormComponent
  },
  {
    path: "formulario/:id",
    component: OrtodonciaFormComponent
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
export class OrtodonciasRoutingModule { }
