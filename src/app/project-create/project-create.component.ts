import { Component, OnInit } from '@angular/core';
import {Organization} from '../models/organization';
import {ApiService} from '../services/api.service';
import {CommonService} from '../services/common.service';
import {Repository} from '../models/repository';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.sass']
})
export class ProjectCreateComponent implements OnInit {
  activeOrg: Organization = new Organization();
  repos: Repository[] =  [];

  constructor(private commonService: CommonService, private apiService: ApiService) { }

  ngOnInit() {
    this.commonService.currentActiveOrg.subscribe(activeOrg => this.activeOrg = activeOrg);

    this.apiService.fetchOrgRepos({}).subscribe(repos => this.repos = repos);
  }

}
