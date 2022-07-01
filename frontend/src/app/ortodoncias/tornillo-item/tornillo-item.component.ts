import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tornillo } from '../models/tornillo';
import { TornilloImpl } from '../models/tornillo-impl';

@Component({
  selector: 'app-tornillo-item',
  templateUrl: './tornillo-item.component.html',
  styleUrls: ['./tornillo-item.component.css']
})
export class TornilloItemComponent implements OnInit {
  @Input() tornillo: Tornillo = new TornilloImpl(0, 0, 0, "", 0, "", "");
  @Output() tornilloSeleccionado = new EventEmitter<Tornillo>();

  constructor() { }

  ngOnInit(): void {
  }

}
