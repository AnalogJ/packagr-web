import { Component, OnInit } from '@angular/core';
import {Organization} from '../models/organization';
import {ApiService} from '../services/api.service';
import {CommonService} from '../services/common.service';
import {Repository} from '../models/repository';
import {Router} from '@angular/router';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.sass']
})
export class ProjectCreateComponent implements OnInit {
  activeOrg: Organization = new Organization();
  repos: Repository[] =  [];

  constructor(private commonService: CommonService, private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.commonService.currentActiveOrg.subscribe(activeOrg => {
      this.activeOrg = activeOrg;

      this.apiService.fetchOrgRepos({
        installationId: this.activeOrg.installationId
      }).subscribe(repos => this.repos = repos);

    });


  }

  createProject(repo: Repository) {
    this.apiService.createProject(repo.org, repo.slug, { installationId: this.activeOrg.installationId, repoId: repo.id })

      .subscribe(
        data => {
          console.log(data);
          this.router.navigate([`/${this.apiService.serviceType()}/${repo.org}/${repo.slug}/edit`]);

        },
        // error => this.alerts.push(new Alert('Error creating new project', error.message)),
        // () => this.loading.createProject = false
      );
  }

  editProject(repo: Repository) {
    this.router.navigate([`/${this.apiService.serviceType()}/${repo.org}/${repo.slug}/edit`]);
  }

}
