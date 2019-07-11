import { Component, OnInit } from '@angular/core';
import {ApiService} from '../services/api.service';
import {switchMap} from 'rxjs/operators';
import {User} from '../models/user';
import {Organization} from '../models/organization';
import {CommonService} from '../services/common.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  activeOrg: Organization = new Organization();
  user: User = new User();

  constructor(private commonService: CommonService) { }

  ngOnInit() {
    this.commonService.currentUser.subscribe(user => this.user = user);
    this.commonService.currentActiveOrg.subscribe(activeOrg => this.activeOrg = activeOrg);
  }

}
