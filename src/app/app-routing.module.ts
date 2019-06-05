import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthConnectComponent} from './auth-connect/auth-connect.component';

const routes: Routes = [
  { path: 'login', component: AuthConnectComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
