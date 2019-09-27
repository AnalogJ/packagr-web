import {Component, HostBinding, HostListener, OnInit} from '@angular/core';
import {Organization} from '../../models/organization';
import {CommonService} from '../../services/common.service';
import {ApiService} from '../../services/api.service';



@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.sass'],
  host: {
    class: 'side-header',
    '(window:resize)': 'onResize($event)'

  }
})
export class LeftMenuComponent implements OnInit {
  activeOrg: Organization = new Organization();
  serviceType: string;

  @HostBinding('class.show') showLeftMenu: boolean = true;
  @HostBinding('class.hide') hideLeftMenu: boolean = false;




  constructor(private commonService: CommonService,  private apiService: ApiService) { }

  ngOnInit() {
    this.serviceType = this.apiService.serviceType();
    this.commonService.currentActiveOrg.subscribe(activeOrg => this.activeOrg = activeOrg);

    this.commonService.currentLeftMenu.subscribe( showLeftMenu => {
      this.showLeftMenu = showLeftMenu;
      this.hideLeftMenu = !showLeftMenu;
    });
  }

  onResize(event) {
    /*
    * // Responsive Variables
      $extraBig-device : 'only screen and (min-width: 1500px)';
      $laptop-device : 'only screen and (min-width: 1200px) and (max-width: 1499px)';
      $desktop-device : 'only screen and (min-width: 992px) and (max-width: 1199px)';
      $tablet-device:'only screen and (min-width: 768px) and (max-width: 991px)';
      $large-mobile:'only screen and (max-width: 767px)';
      $small-mobile: 'only screen and (max-width: 575px)';
      $extra-small-mobile: 'only screen and (max-width: 479px)';
    * */

    if (event.target.innerWidth <= 1199) {
      this.commonService.changeShowLeftMenu(false);
    } else {
      this.commonService.changeShowLeftMenu(true);
    }

    // console.log(event.target.innerWidth); // window width
  }

  closeLeftMenu() {
    this.commonService.changeShowLeftMenu(false);
  }
}
