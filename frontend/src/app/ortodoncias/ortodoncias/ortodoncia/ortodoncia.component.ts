import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Alambre } from '../../models/alambre';
import { AlambreImpl } from '../../models/alambre-impl';
import { Ortodoncia } from '../../models/ortodoncia';
import { OrtodonciaImpl } from '../../models/ortodoncia-impl';
import { Tornillo } from '../../models/tornillo';
import { TornilloImpl } from '../../models/tornillo-impl';

@Component({
  selector: 'app-ortodoncia',
  templateUrl: './ortodoncia.component.html',
  styleUrls: ['./ortodoncia.component.css']
})
export class OrtodonciaComponent implements OnInit {
  @Input() ortodoncia: Ortodoncia = new OrtodonciaImpl(0, '', '' ,'' ,0, [], '', '');
  @Output() ortodonciaEliminar = new EventEmitter<Ortodoncia>()
  @Output() alambre: Alambre = new AlambreImpl(0, 0, 0, 0, 0, "","");
  @Output() tornillo: Tornillo = new TornilloImpl(0, 0, 0, "", 0, "", "");

  constructor() { }

  ngOnInit(): void {
  }

  eliminar(): void {
    this.ortodonciaEliminar.emit(this.ortodoncia);
  }

}
