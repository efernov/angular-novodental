import { Component, OnInit } from '@angular/core';
import { TornilloImpl } from '../models/tornillo-impl';
import { TornilloService } from '../service/tornillo.service';

@Component({
  selector: 'app-tornillo',
  templateUrl: './tornillo.component.html',
  styleUrls: ['./tornillo.component.css']
})
export class TornilloComponent implements OnInit {
  tornillo: TornilloImpl = new TornilloImpl(0, 0, 0, "", 0, "");

  constructor(private tornilloService: TornilloService) { }

  ngOnInit(): void {
  }

  create() {
    this.tornilloService.postTornillo(this.tornillo);
  }

}
