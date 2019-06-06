import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthConnectComponent} from './auth-connect/auth-connect.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthCallbackComponent} from './auth-callback/auth-callback.component';

const routes: Routes = [
  { path: 'login', component: AuthConnectComponent },
  { path: 'auth/connect', component: AuthConnectComponent },
  { path: 'auth/callback/:serviceType', component: AuthCallbackComponent },

  { path: 'dashboard', component: DashboardComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
