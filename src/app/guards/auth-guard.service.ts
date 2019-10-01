import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import {ApiService} from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private apiService: ApiService, private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.apiService.loggedIn()) {
      console.log('LOGGED IN!')
      return true;
    }

    const redirectUrl = state.url;
    console.error(`!!COULD NOT LOGIN!! ${redirectUrl}`);

    // save redirect url so after auth we can move them back to the page they requested
    localStorage.setItem('redirect_url', redirectUrl);
    // navigate to login page
    this.router.navigate(['/login']);
    return false;
  }

}
