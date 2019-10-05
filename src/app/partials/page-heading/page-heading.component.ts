import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-page-heading',
  templateUrl: './page-heading.component.html',
  styleUrls: ['./page-heading.component.sass']
})
export class PageHeadingComponent implements OnInit {

  @Input() headingText: string;
  @Input() subtitleText: string;
  @Input() subtitleLink: string;
  @Input() scmLink: string;

  subtitleLinkPrefix: string;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.subtitleLinkPrefix = `/${this.apiService.serviceType()}`;
  }

}
