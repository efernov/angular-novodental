import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ortodoncia } from '../models/ortodoncia';
import { OrtodonciaImpl } from '../models/ortodoncia-impl';

@Component({
  selector: 'app-ortodoncia-item',
  templateUrl: './ortodoncia-item.component.html',
  styleUrls: ['./ortodoncia-item.component.css']
})
export class OrtodonciaItemComponent implements OnInit {
  @Input() ortodoncia: Ortodoncia = new OrtodonciaImpl(0, "", "", "", 0, [], "");
  @Output() ortodonciaSeleccionada = new EventEmitter<Ortodoncia>();

  constructor() { }

  ngOnInit(): void {
  }


}
