import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrtodonciaFormComponent } from './ortodoncia-form/ortodoncia-form.component';
import { OrtodonciasComponent } from './ortodoncias/ortodoncias.component';


const routes: Routes = [
  {
    path: "",
    component: OrtodonciasComponent,
  },
  {
    path: "formulario",
    component: OrtodonciaFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrtodonciasRoutingModule { }
