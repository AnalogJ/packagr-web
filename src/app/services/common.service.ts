import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Organization} from '../models/organization';
import {User} from '../models/user';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})

export class CommonService {

  private activeOrgSource = new BehaviorSubject(new Organization());
  currentActiveOrg = this.activeOrgSource.asObservable();

  private userSource = new BehaviorSubject(new User());
  currentUser = this.userSource.asObservable();

  constructor(private apiService: ApiService) {
    this.apiService.fetchUser().subscribe(
      data => {
        console.log(data);
        this.changeUser(data);
      },
      // error => this.alerts.push(new Alert('Error retrieving projects', error.message)),
      // () => this.loading.projects = false
    );
  }

  changeActiveOrg(nextOrg: Organization) {
    this.activeOrgSource.next(nextOrg);
  }

  changeUser(nextUser: User) {
    this.userSource.next(nextUser);
  }


}
