import { Component, Input, OnInit } from '@angular/core';
import { MaterialImpl } from '../models/material-impl';

@Component({
  selector: 'app-material-item',
  templateUrl: './material-item.component.html',
  styleUrls: ['./material-item.component.css']
})
export class MaterialItemComponent implements OnInit {
  @Input() material: MaterialImpl = new MaterialImpl(0, 0, "", "");

  constructor() { }

  ngOnInit(): void {
  }

}
