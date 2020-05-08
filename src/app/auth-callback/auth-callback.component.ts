import {AfterViewInit, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {Router, Params} from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.sass']
})
export class AuthCallbackComponent implements AfterViewInit {
  @ViewChild('childModal', { static: false }) childModal: ModalDirective;

  successfulCallback = true;

  constructor(private modalService: BsModalService, private apiService: ApiService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngAfterViewInit() {
    this.childModal.show();

    // process the query string for the code
    console.log('GETTING QUERY STRING PARAMS');
    console.log(this.activatedRoute.snapshot.paramMap);
    console.log(this.activatedRoute.snapshot.queryParamMap);

    const queryParams = {}
    this.activatedRoute.snapshot.queryParamMap.keys.forEach((key: string) => {
      console.log('PARAM', key, this.activatedRoute.snapshot.queryParamMap.get(key));
      queryParams[key] = this.activatedRoute.snapshot.queryParamMap.get(key);
    })

    this.apiService.authCallback(this.activatedRoute.snapshot.params.serviceType, queryParams)
      .subscribe(
        data => {
          console.log(data);
          localStorage.setItem('id_token', data.token); // set the JWT token
          localStorage.setItem('serviceType', data.serviceType);

          const redirectUrl = localStorage.getItem('redirect_url');
          if (redirectUrl) {
            localStorage.removeItem('redirect_url');
            this.router.navigateByUrl(redirectUrl);
          } else {
            this.router.navigate(['/dashboard']);
          }

        },
        error => {
          this.successfulCallback = false;
          console.log(error);
        }
      );
  }
  // loginWith(serviceType){
  //   console.log(serviceType);
  //   this.loading[serviceType] = true;
  //
  //   this.apiService.authConnect(serviceType)
  //     .subscribe(
  //       data => {
  //         console.log(data);
  //         window.location.href = data.url
  //       },
  //       error => console.log(error),
  //       () => this.loading[serviceType] = false
  //     )
  // }

}
