import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from '../services/api.service';
import {ActivatedRoute} from '@angular/router';
import {Job} from '../models/job';
import {PullRequest} from '../models/pull-request';
import {Project} from '../models/project';
import {Alert} from '../models/alert';
import {CommonService} from '../services/common.service';
import {Subscription, timer} from 'rxjs';

@Component({
  selector: 'app-project-deploy-logs',
  templateUrl: './project-deploy-logs.component.html',
  styleUrls: ['./project-deploy-logs.component.sass']
})
export class ProjectDeployLogsComponent implements OnInit, OnDestroy {
  loading = {
    logs: false,
    project: true,
    pullrequest: true,
  };

  repo: string;
  org: string;
  prNumber: string;
  jobId: string;
  nextToken: string = '';

  projectData: Project;
  pullRequestData: PullRequest;
  jobData: Job;
  logs: Array<any> = [];


  logSubscription: Subscription;

  constructor(private apiService: ApiService, private commonService: CommonService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.repo = this.activatedRoute.snapshot.params.repo;
    this.org = this.activatedRoute.snapshot.params.org;
    this.prNumber = this.activatedRoute.snapshot.params.prNumber;
    this.jobId = this.activatedRoute.snapshot.params.jobId;


    this.apiService.getProject(this.org, this.repo, {jobId: this.jobId})
      .subscribe(
        data => {
          console.log(data);
          this.projectData = data;
          this.jobData = this.projectData.jobs[0];
          this.subscribeJobLogs();

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
              error => this.commonService.addAlert(new Alert('Error retrieving pr data', error.message)),
              () => this.loading.pullrequest = false
            );



        },
        error => this.commonService.addAlert(new Alert('Error retrieving project data', error.message)),
        () => this.loading.project = false
      );

  }

  ngOnDestroy() {
    this.logSubscription.unsubscribe();
  }


  subscribeJobLogs() {
    const logTimer = timer(0, 3000); // start at 0ms and re-run every 3 seconds (3000ms)
    this.logSubscription = logTimer.subscribe(t => {
      // dont make new requests if theres already a pending request for logs.
      if (this.loading.logs) {
        console.log('Already requested logs, skipping.')
        return;
      }
      this.loading.logs = true;

      const queryParams: any = {
        installationId: this.projectData.installation.id,
      };
      if (this.nextToken) {
        queryParams.nextToken = this.nextToken;
      }

      // we need to send timestamp in milliseconds, not seconds.
      this.apiService.getJobLogs(this.org, this.repo, this.prNumber, this.jobId, queryParams
        )
        .subscribe(
          data => {
            this.jobData.status = data.status;

            if (this.jobData.status === 'PENDING') {
              return;
            }

            // container is running or stopped
            if (!data.Lines || data.Lines.length === 0){
              this.logSubscription.unsubscribe();
            } else {
              this.logs = this.logs.concat(data.Lines);
            }
          },
          error => {
            this.commonService.addAlert(new Alert('Error retrieving log data', error.message)),
            this.logSubscription.unsubscribe();
          },
          () => {
            this.loading.logs = false;
          }

        );
    });
  }
}
