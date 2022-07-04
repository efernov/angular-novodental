import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Alambre } from '../models/alambre';
import { AlambreImpl } from '../models/alambre-impl';

@Component({
  selector: 'app-alambre-item',
  templateUrl: './alambre-item.component.html',
  styleUrls: ['./alambre-item.component.css']
})
export class AlambreItemComponent implements OnInit {
  @Input() alambre: Alambre = new AlambreImpl(0, 0, 0, 0, 0, "", "");
  @Output() alambreSeleccionado = new EventEmitter<Alambre>();

  constructor() { }

  ngOnInit(): void {
  }

}
