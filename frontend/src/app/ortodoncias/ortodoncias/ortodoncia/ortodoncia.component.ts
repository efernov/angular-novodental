import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ortodoncia } from '../../models/ortodoncia';
import { OrtodonciaImpl } from '../../models/ortodoncia-impl';

@Component({
  selector: 'app-ortodoncia',
  templateUrl: './ortodoncia.component.html',
  styleUrls: ['./ortodoncia.component.css']
})
export class OrtodonciaComponent implements OnInit {
  @Input() ortodoncia: Ortodoncia = new OrtodonciaImpl(0, "", "", "", 0, [], "");
  @Output() ortodonciaEliminar = new EventEmitter<Ortodoncia>()

  constructor() { }

  ngOnInit(): void {
  }

  eliminar(): void {
    this.ortodonciaEliminar.emit(this.ortodoncia);
  }

}
