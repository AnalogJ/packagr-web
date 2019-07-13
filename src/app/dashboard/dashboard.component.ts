import { Component, OnInit } from '@angular/core';
import {ApiService} from '../services/api.service';
import {switchMap} from 'rxjs/operators';
import {User} from '../models/user';
import {Organization} from '../models/organization';
import {CommonService} from '../services/common.service';
import {Project} from '../models/project';
import {Router} from '@angular/router';
import {PullRequest} from '../models/pull-request';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  projects: Project[] = [];
  activeProject: Project = null
  activeProjectPRs: PullRequest[];

  activeOrg: Organization = new Organization();
  user: User = new User();

  constructor(private commonService: CommonService, private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.commonService.currentUser.subscribe(user => this.user = user);
    this.commonService.currentActiveOrg.subscribe(activeOrg => {
      this.activeOrg = activeOrg;
      this.getProjects();
    });
  }

  getProjects() {
    this.apiService.getProjects(this.activeOrg.slug).subscribe(
      data => {
        console.log(data);
        this.projects = data;
        if (this.projects.length === 0) {
          this.router.navigate([`/${this.apiService.serviceType()}/${this.activeOrg.slug}/create`]);
        } else {
          this.activeProject = this.projects[0];
          this.getProjectPullRequests()
        }
      }
      // error => this.alerts.push(new Alert('Error retrieving projects', error.message)),
      // () => this.loading.projects = false
    );
  }

  private getProjectPullRequests() {
    // this.loading.pullrequests[this.selectedProject.RepoId] = true;
    this.apiService.fetchOrgRepoPullRequests({
      org: this.activeProject.org,
      repo: this.activeProject.repo,
      installationId: this.activeProject.installation.id
    }).subscribe(
      data => {
        console.log(data);
        this.activeProjectPRs = data;
      },
      // error => this.alerts.push(new Alert('Error retrieving pull requests', error.message)),
      // () => this.loading.pullrequests[this.selectedProject.RepoId] = false
    );
  }

}
