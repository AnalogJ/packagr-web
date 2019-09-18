import { Component, OnInit } from '@angular/core';
import {Organization} from '../models/organization';
import {ApiService} from '../services/api.service';
import {CommonService} from '../services/common.service';
import {Repository} from '../models/repository';
import {Router} from '@angular/router';
import {Alert} from '../models/alert';
import {Project} from '../models/project';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.sass']
})
export class ProjectCreateComponent implements OnInit {
  loading: {[comp: string]: boolean; } = {
    repos: false,
    projects: false,
    createProject: false,
  };

  currentReposPage: number = 1;
  loadedAllRepos: boolean = false;


  activeOrg: Organization = new Organization();
  repos: Repository[] =  [];
  projects: Project[] = []
  constructor(private commonService: CommonService, private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.commonService.currentActiveOrg.subscribe(activeOrg => {
      this.activeOrg = activeOrg;
      this.repos = [];
      this.projects = [];
      this.currentReposPage = 0; // reset, 1 based index (will be incremented by fetch)
      this.loadedAllRepos = false;

      this.fetchActiveOrgReposPaginated();
      this.getProjects();
    });
  }

  getProjects() {
    if (!this.activeOrg) { return; }
    this.loading.projects = true;
    this.apiService.getProjects(this.activeOrg.slug).subscribe(
      projects => this.projects = projects,
      error => this.commonService.addAlert(new Alert('Error retrieving projects', error.message)),
      () => this.loading.projects = false
    );
  }

  fetchActiveOrgReposPaginated() {
    if (this.loading.repos) { return; }
    if (this.loadedAllRepos) { return; }
    if (!this.activeOrg) { return; }
    this.loading.repos = true;
    this.apiService.fetchOrgRepos({
      installationId: this.activeOrg.installationId
    }, this.currentReposPage)
      .subscribe(
        data => {
          console.log(data);
          this.currentReposPage += 1;
          if (data.length === 0) {
            this.loadedAllRepos = true;
          } else {
            this.repos = this.repos.concat(data);
          }
        },
        error => this.commonService.addAlert(new Alert('Error retrieving organization repositories', error.message)),
        () => this.loading.repos = false
      );

  }

  existingProject(repo: Repository) {
    return this.projects.some( project => {
      return project.org.toLowerCase() === repo.org.toLowerCase() && project.repo === repo.slug.toLowerCase();
    });
  }

  createProject(repo: Repository) {
    this.loading.createProject = true;
    this.apiService.createProject(repo.org, repo.slug, { installationId: this.activeOrg.installationId, repoId: repo.id })
      .subscribe(
        data => {
          console.log(data);
          this.router.navigate([`/${this.apiService.serviceType()}/${repo.org}/${repo.slug}/edit`]);
        },
        error => this.commonService.addAlert(new Alert('Error creating new project', error.message)),
        () => this.loading.createProject = false
      );
  }

  editProject(repo: Repository) {
    this.router.navigate([`/${this.apiService.serviceType()}/${repo.org}/${repo.slug}/edit`]);
  }

}
