import { Component, OnInit } from '@angular/core';
import { createPopper } from '@popperjs/core';


const popcorn = document.querySelector('#popcorn');
const tooltip = document.querySelector('#tooltip');


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }



}
