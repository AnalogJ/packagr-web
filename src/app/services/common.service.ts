import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Organization} from '../models/organization';
import {User} from '../models/user';
import {ApiService} from './api.service';
import {Alert} from '../models/alert';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

export class CommonService {

  private activeOrgSource = new BehaviorSubject(new Organization());
  currentActiveOrg = this.activeOrgSource.asObservable();

  private userSource = new BehaviorSubject(new User());
  currentUser = this.userSource.asObservable();

  private alertsSource = new BehaviorSubject([]);
  currentAlerts = this.alertsSource.asObservable();

  constructor(private apiService: ApiService, private toastr: ToastrService) {
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

  addAlert(newAlert: Alert) {
    const alerts = this.alertsSource.getValue();
    alerts.push(newAlert);
    this.alertsSource.next(alerts);

    this.toastr.error(newAlert.msg, newAlert.title);
  }


}
