import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.sass']
})
export class AuthCallbackComponent implements OnInit {

  constructor() { }

  ngOnInit() {
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
