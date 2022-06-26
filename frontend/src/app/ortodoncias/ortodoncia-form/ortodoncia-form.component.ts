import { Component, OnInit } from '@angular/core';
import { OrtodonciaImpl } from '../models/ortodoncia-impl';
import { OrtodonciaService } from '../service/ortodoncia.service';

@Component({
  selector: 'app-ortodoncia-form',
  templateUrl: './ortodoncia-form.component.html',
  styleUrls: ['./ortodoncia-form.component.css']
})
export class OrtodonciaFormComponent implements OnInit {
  ortodoncia: OrtodonciaImpl = new OrtodonciaImpl(0, "", "", "", 0, [], "")

  alambres:any[]=[];

  constructor(private ortodonciaService: OrtodonciaService) { }

  ngOnInit(): void {
  }
  create() {
    debugger;
    this.ortodonciaService.postOrtodoncia(this.ortodoncia);
  }

}
