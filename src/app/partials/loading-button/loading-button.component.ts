import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-loading-button',
  templateUrl: './loading-button.component.html',
  styleUrls: ['./loading-button.component.sass']
})
export class LoadingButtonComponent implements OnInit {

  @Input() buttonClass: string;
  @Input() isLoading: boolean;
  @Output() buttonClicked = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onButtonClicked(event) {
    this.buttonClicked.emit(event);
  }
}
