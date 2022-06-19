import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/not-found/not-found.component';

const routes: Routes = [

  {
    path: "",
    loadChildren: () => import("./home/home.module").then((m) => m.HomeModule),
  },
  {
    path: "about",
    loadChildren: () => import("src/app/about/about.module").then(m => m.AboutModule),
  },
  {
    path: "ortodoncias",
    loadChildren: () => import("./ortodoncias/ortodoncias.module").then((m) => m.OrtodonciasModule),
  },
  {
    path: "materiales",
    loadChildren: () => import("./materiales/materiales.module").then((m) => m.MaterialesModule),
  },
  {
    path: "not-found",
    component: NotFoundComponent,
  },
  {
    path: "**",
    redirectTo: "not-found",
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
