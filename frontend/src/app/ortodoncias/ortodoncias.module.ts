import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrtodonciasComponent } from './ortodoncias/ortodoncias.component';
import { OrtodonciasRoutingModule } from './ortodoncias-routing.module';
import { CoreModule } from '../core/core.module';
import { HomeModule } from '../home/home.module';

import { FormsModule } from '@angular/forms';
import { AuxiliarService } from '../service/auxiliar.service';
import { OrtodonciaFormComponent } from './ortodoncia-form/ortodoncia-form.component';
import { OrtodonciaItemComponent } from './ortodoncia-item/ortodoncia-item.component';
import { OrtodonciaComponent } from './ortodoncias/ortodoncia/ortodoncia.component';
import { AlambreComponent } from './alambre/alambre.component';
import { TornilloComponent } from './tornillo/tornillo.component';
import { AlambreItemComponent } from './alambre-item/alambre-item.component';
import { TornilloItemComponent } from './tornillo-item/tornillo-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';




@NgModule({
  declarations: [
    OrtodonciasComponent,
    OrtodonciaFormComponent,
    OrtodonciaItemComponent,
    OrtodonciaComponent,
    AlambreComponent,
    TornilloComponent,
    AlambreItemComponent,
    TornilloItemComponent,

     ],
  imports: [
    CommonModule,
    OrtodonciasRoutingModule,
    CoreModule,
    HomeModule,
    FormsModule,
    FontAwesomeModule,
  ],
  exports: [OrtodonciaComponent],
  providers: [AuxiliarService]
})
export class OrtodonciasModule { }
