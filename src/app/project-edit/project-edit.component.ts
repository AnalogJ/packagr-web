import { Component, OnInit } from '@angular/core';
import {ApiService} from '../services/api.service';
import {ActivatedRoute} from '@angular/router';
import {Project} from '../models/project';
import {AppSettings} from '../app-settings';
import {CommonService} from '../services/common.service';
import {Alert} from '../models/alert';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.sass']
})
export class ProjectEditComponent implements OnInit {
  loading: {[comp: string]: boolean} = {
    project: true,
    queryDockerImages: false,
    saveSettings: false,
    saveSecret: false,
  };
  hideAddSecretForm: boolean = true;

  repo: string;
  org: string;

  projectData: Project = null;

  optionDockerImages = AppSettings.DOCKER_IMAGES;
  optionDockerImagesKeys = Object.keys(this.optionDockerImages);

  dockerImagesDatasource: Observable<any>;
  dockerImagesNoResults: boolean = false;

  secretName: string = '';
  secretValue: string = '';
  constructor(private apiService: ApiService, private activatedRoute: ActivatedRoute, private commonService: CommonService) { }

  ngOnInit() {
    this.repo = this.activatedRoute.snapshot.params.repo;
    this.org = this.activatedRoute.snapshot.params.org;
    this.apiService.getProject(this.org, this.repo)
      .subscribe(
        data => {
          console.log(data);
          this.projectData = data;
          console.log(this.projectData);
          // this.projectSettings = data.settings || this.projectSettings;
          // this.projectSecrets = data.secrets || this.projectSecrets;
          // this.projectSecretsKeys = Object.keys(this.projectSecrets)
        },
        error => this.commonService.addAlert(new Alert('Error retrieving project', error.message)),
        () => this.loading.project = false
      );

    this.dockerImagesDatasource = Observable.create((observer: any) => {
      // Runs on every search
      observer.next(this.projectData.settings.dockerImage);
    }).mergeMap((token: string) => {
      this.apiService.fetchDockerImage(token)
    });
  }

  saveSettings() {
    const payload = {
      settings: this.projectData.settings
    };
    this.loading.saveSettings = true;
    this.apiService.editProject(this.org, this.repo, {
      installationId: this.projectData.installation.id
    }, payload)
      .subscribe(
        data => {
          console.log('PROJECT UPDATE SETTING RESP', data);
          this.projectData.settings = data.settings;
        },
        error => this.commonService.addAlert(new Alert('Error updating project', error.message)),
        () =>  this.loading.saveSettings = false
      );
  }

  saveSecret() {
    const payload = {
      secrets: {}
    };
    payload.secrets[this.secretName] = this.secretValue;
    this.loading.saveSecret = true;
    this.apiService.editProject(this.org, this.repo, {
      installationId: this.projectData.installation.id
    }, payload)
      .subscribe(
        data => {
          console.log('PROJECT UPDATE SWECRET RESP', data);

          this.projectData.secrets = data.secrets;
          this.secretName = '';
          this.secretValue = '';
        },
        error => this.commonService.addAlert(new Alert('Error updating project secrets', error.message)),
        () =>  this.loading.saveSecret = false
      );
  }
  cancelSecret(){
    this.secretName = '';
    this.secretValue = '';
    this.hideAddSecretForm = true;
  }

  packageTypeChanged(e) {
    this.projectData.settings.dockerImage = this.optionDockerImages[this.projectData.settings.packageType].image;
  }
  // Docker Image Typeahead
  dockerImagesLoading(e: boolean) {
    this.loading.queryDockerImages = e;
  }
  dockerImagesNoResultsHandler(e: boolean): void {
    this.dockerImagesNoResults = e;
  }
}
