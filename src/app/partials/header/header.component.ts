import { Component, OnInit } from '@angular/core';
import { Organization } from '../../models/organization';
import { User } from '../../models/user';
import { CommonService } from '../../services/common.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
  host: {class: 'header-section'}
})
export class HeaderComponent implements OnInit {
  orgs: Organization[] = [];
  activeOrg: Organization = new Organization();
  user: User = new User();

  serviceType: string;

  constructor(private commonService: CommonService, private apiService: ApiService) { }

  ngOnInit() {
    this.serviceType = this.apiService.serviceType();
    this.commonService.currentUser.subscribe(user => this.user = user)
    this.commonService.currentActiveOrg.subscribe(activeOrg => this.activeOrg = activeOrg)

    this.apiService.fetchOrgs().subscribe(
      data => {
        console.log(data);
        this.orgs = data;
        if (!this.orgs) {
          // user has not installed packagr app on any organizations.
          window.location.href = this.apiService.appInstallationUrl();
        }
        this.commonService.changeActiveOrg(this.orgs[0]);
      },
      error => console.log(error)
    );
  }

  toggleShowLeftMenu() {
    this.commonService.toggleShowLeftMenu();
  }

  changeActiveOrg(nextActiveOrg: Organization) {
    this.commonService.changeActiveOrg(nextActiveOrg);
  }

}
