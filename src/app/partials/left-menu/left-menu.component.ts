import { Component, OnInit } from '@angular/core';
import {Organization} from '../../models/organization';
import {CommonService} from '../../services/common.service';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.sass'],
  host: {class: 'side-header show'}
})
export class LeftMenuComponent implements OnInit {
  activeOrg: Organization = new Organization();

  constructor(private commonService: CommonService) { }

  ngOnInit() {
    this.commonService.currentActiveOrg.subscribe(activeOrg => this.activeOrg = activeOrg);
  }

}
