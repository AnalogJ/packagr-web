import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-auth-connect',
  templateUrl: './auth-connect.component.html',
  styleUrls: ['./auth-connect.component.sass']
})
export class AuthConnectComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  loading = {
    gh: false,
    bb: false
  };

  ngOnInit() {
  }

  loginWith(serviceType){
    console.log(serviceType);
    this.loading[serviceType] = true;

    this.apiService.authConnect(serviceType)
      .subscribe(
        data => {
          console.log(data);
          window.location.href = data.url;
        },
        error => console.log(error),
        () => this.loading[serviceType] = false
      );
  }
}
