import { Component, OnInit } from '@angular/core';
import { AlambreImpl } from '../models/alambre-impl';
import { AlambreService } from '../service/alambre.service';

@Component({
  selector: 'app-alambre',
  templateUrl: './alambre.component.html',
  styleUrls: ['./alambre.component.css']
})
export class AlambreComponent implements OnInit {
  alambre: AlambreImpl = new AlambreImpl(0, 0, 0, 0, 0, "");

  constructor(private alambreService: AlambreService) { }

  ngOnInit(): void {
  }

  create() {
    this.alambreService.postAlambre(this.alambre);
  }

}
