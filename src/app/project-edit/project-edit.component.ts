import { Component, OnInit } from '@angular/core';
import {ApiService} from '../services/api.service';
import {ActivatedRoute} from '@angular/router';
import {Project} from '../models/project';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.sass']
})
export class ProjectEditComponent implements OnInit {
  hideAddSecretForm: boolean = true;

  repo: string;
  org: string;

  projectData: Project = new Project();

  constructor(private apiService: ApiService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.repo = this.activatedRoute.snapshot.params.repo;
    this.org = this.activatedRoute.snapshot.params.org;
    this.apiService.getProject(this.org, this.repo)
      .subscribe(
        data => {
          console.log(data);
          this.projectData = data;
          // this.projectData = data.Settings || this.projectData;
          // this.projectSecrets = data.Secrets || this.projectSecrets;
          // this.projectSecretsKeys = Object.keys(this.projectSecrets)
        },
        // error => this.alerts.push(new Alert('Error retrieving project', error.message)),
        // () => this.loading.project = false
      );

    // this.dockerImagesDatasource = Observable.create((observer:any) => {
    //   // Runs on every search
    //   observer.next(this.projectData.dockerImage);
    // }).mergeMap((token:string) => this.apiService.fetchDockerImage(token));
  }

}
