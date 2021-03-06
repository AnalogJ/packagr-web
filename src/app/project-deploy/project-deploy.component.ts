import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from '../services/api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Project} from '../models/project';
import {PullRequest} from '../models/pull-request';
import {CommonService} from '../services/common.service';
import {Alert} from '../models/alert';
import {AppSettings} from '../app-settings';
import {Commit} from '../models/commit';

@Component({
  selector: 'app-project-deploy',
  templateUrl: './project-deploy.component.html',
  styleUrls: ['./project-deploy.component.sass']
})
export class ProjectDeployComponent implements OnInit {
  loading: {[comp: string]: boolean} = {
    pullrequest: true,
    commits: true,
    project: true,
    createRelease: false,
    fileConfig: true,
  }

  @Input() settingsPanelOpen = true;
  @Input() secretsPanelOpen = false;
  @Input() configPanelOpen = false;


  repo: string;
  org: string;
  prNumber: string;
  projectData: Project = new Project();
  pullRequestData: PullRequest = new PullRequest();
  pullRequestCommits: Commit[] = [];
  optionDockerImages = AppSettings.DOCKER_IMAGES;
  configFileContent: string = '';
  versionIncr: string = 'patch';
  constructor(private apiService: ApiService, private commonService: CommonService, private activatedRoute: ActivatedRoute, private router: Router) { }

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

          this.apiService.fetchOrgRepoPullRequestCommits({
            installationId: this.projectData.installation.id,
            org: this.org,
            repo: this.repo,
            prNumber: this.prNumber
          })
            .subscribe(
              prCommits => {
                console.log(prCommits);
                this.pullRequestCommits = prCommits;
              },
              error => this.commonService.addAlert(new Alert('Error retrieving project commits', error.message)),
              () => this.loading.commits = false
            );

          this.apiService.fetchOrgRepoFileContent({
            installationId: this.projectData.installation.id,
            org: this.org,
            repo: this.repo,
            path: 'packagr.yml'
          })
            .subscribe(
              fileContent => {
                this.configFileContent = fileContent;
              },
              error => {},
              // error => this.commonService.addAlert(new Alert('Error retrieving file content', error.message)),
              () => this.loading.fileConfig = false
            );
        },
        error => this.commonService.addAlert(new Alert('Error retrieving project', error.message)),
        () => this.loading.project = false
      );
  }

  createRelease() {
    // TODO: this function should also send version increment & custom changelog.
    this.loading.createRelease = true;
    this.apiService.startJob(this.org, this.repo, this.prNumber, {versionIncr: this.versionIncr},
      { installationId: this.projectData.installation.id })
      .subscribe(
        data => {
          console.log("TASK/JOB DATA", data);
          this.router.navigate([`/${this.apiService.serviceType()}/${this.org}/${this.repo}/pr/${this.prNumber}/${data.id}`]);
        },
        error => this.commonService.addAlert(new Alert('Error creating new release', error.message)),
        () => this.loading.createRelease = false
      );
  }

}
