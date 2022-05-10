import { Component, OnInit } from '@angular/core';
import { createPopper } from '@popperjs/core';


const popcorn = document.querySelector('#popcorn');
const tooltip = document.querySelector('#tooltip');

createPopper(popcorn, tooltip, {
  placement: 'right-start',
});
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    var popover = new bootstrap.Popover(document.querySelector('.popover-dismiss'), {
      trigger: 'focus'
    })
  }



}
