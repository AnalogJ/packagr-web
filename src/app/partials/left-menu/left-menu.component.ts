import { Component, OnInit } from '@angular/core';
import {Organization} from '../../models/organization';
import {CommonService} from '../../services/common.service';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.sass'],
  host: {class: 'side-header show'}
})
export class LeftMenuComponent implements OnInit {
  activeOrg: Organization = new Organization();
  serviceType: string;

  constructor(private commonService: CommonService,  private apiService: ApiService) { }

  ngOnInit() {
    this.serviceType = this.apiService.serviceType();
    this.commonService.currentActiveOrg.subscribe(activeOrg => this.activeOrg = activeOrg);
  }

}
