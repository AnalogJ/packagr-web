import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.sass'],
  host: {class: 'side-header show'}
})
export class LeftMenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
