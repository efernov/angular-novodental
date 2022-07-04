import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Material } from '../models/material';

import { MaterialImpl } from '../models/material-impl';

@Component({
  selector: 'app-material-item',
  templateUrl: './material-item.component.html',
  styleUrls: ['./material-item.component.css']
})
export class MaterialItemComponent implements OnInit {
  @Input() material: MaterialImpl = new MaterialImpl(0, 0, 0, 0, 0, 0, '', '', '', '');
  @Output() materialSeleccionado = new EventEmitter<Material>();

  constructor() { }

  ngOnInit(): void {
  }

}
