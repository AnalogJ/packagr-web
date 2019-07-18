import { Component, OnInit } from '@angular/core';
import {ApiService} from '../services/api.service';
import {ActivatedRoute} from '@angular/router';
import {Project} from '../models/project';
import {PullRequest} from '../models/pull-request';
import {CommonService} from '../services/common.service';
import {Alert} from '../models/alert';
import {AppSettings} from '../app-settings';

@Component({
  selector: 'app-project-deploy',
  templateUrl: './project-deploy.component.html',
  styleUrls: ['./project-deploy.component.sass']
})
export class ProjectDeployComponent implements OnInit {
  loading: {[comp: string]: boolean} = {
    pullrequest: true,
    project: true,
  }

  repo: string;
  org: string;
  prNumber: string;
  projectData: Project = new Project();
  pullRequestData: PullRequest = new PullRequest();

  optionDockerImages = AppSettings.DOCKER_IMAGES;
  versionIncr: string = 'patch';
  constructor(private apiService: ApiService, private commonService: CommonService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.repo = this.activatedRoute.snapshot.params.repo;
    this.org = this.activatedRoute.snapshot.params.org;
    this.prNumber = this.activatedRoute.snapshot.params.prNumber;

    this.apiService.getProject(this.org, this.repo)
      .subscribe(
        data => {
          console.log(data);
          this.projectData = data;
          this.versionIncr = this.projectData.settings.versionIncr || this.versionIncr

          this.apiService.fetchOrgRepoPullRequest({
            installationId: this.projectData.installation.id,
            org: this.org,
            repo: this.repo,
            prNumber: this.prNumber
          })
            .subscribe(
              prData => {
                console.log(prData);
                this.pullRequestData = prData;
              },
              error => this.commonService.addAlert(new Alert('Error retrieving project', error.message)),
              () => this.loading.pullrequest = false
            );
        },
        error => this.commonService.addAlert(new Alert('Error retrieving project', error.message)),
        () => this.loading.project = false
      );



  }

}
