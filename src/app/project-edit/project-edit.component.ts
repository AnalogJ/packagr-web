import { Component, OnInit } from '@angular/core';
import {ApiService} from '../services/api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Project} from '../models/project';
import {AppSettings} from '../app-settings';
import {CommonService} from '../services/common.service';
import {Alert} from '../models/alert';
import {Observable} from 'rxjs';
import {ProjectSecret} from '../models/project-secret';

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
    deleteProject: false,
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
  constructor(private apiService: ApiService, private activatedRoute: ActivatedRoute, private router: Router, private commonService: CommonService) {}

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
      console.log(`Datasource queried: ${this.projectData.settings.dockerImage}`);

      this.apiService.fetchDockerImage(this.projectData.settings.dockerImage)
        .subscribe(resp => {
          observer.next(resp.results);
        });
    });
    //   .mergeMap((token: string) => {
    //   console.log(`searching for: ${token}`)
    //   this.apiService.fetchDockerImage(token);
    // });
  }

  deleteProject() {
    this.loading.deleteProject = true;
    this.apiService.deleteProject(this.org, this.repo, {
      installationId: this.projectData.installation.id
    })
      .subscribe(
        data => {
          this.router.navigate([`/${this.apiService.serviceType()}/${this.org}`]);
        },
        error => this.commonService.addAlert(new Alert('Error deleting project', error.message)),
        () =>  this.loading.deleteProject = false
      );
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
  deleteSecret(deleteSecretName: string) {
    const payload = {
      delete_secrets: {}
    };
    payload.delete_secrets[deleteSecretName] = false;
    this.loading.saveSecret = true;

    this.apiService.editProject(this.org, this.repo, {
      installationId: this.projectData.installation.id
    }, payload)
      .subscribe(
        data => {
          console.log('PROJECT DELETE SECRET RESP', data);
          delete this.projectData.secrets[deleteSecretName];

        },
        error => this.commonService.addAlert(new Alert('Error deleting project secret', error.message)),
        () =>  this.loading.saveSecret = false
      );

  }
  cancelSecret() {
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
