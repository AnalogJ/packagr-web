import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthConnectComponent} from './auth-connect/auth-connect.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthCallbackComponent} from './auth-callback/auth-callback.component';
import { AuthGuard } from './guards/auth-guard.service';
import {ProjectEditComponent} from './project-edit/project-edit.component';
import {ProjectCreateComponent} from './project-create/project-create.component';
import {ProjectDeployComponent} from './project-deploy/project-deploy.component';
import {ProjectDeployLogsComponent} from './project-deploy-logs/project-deploy-logs.component';

const routes: Routes = [
  { path: 'login', component: AuthConnectComponent },
  { path: 'auth/connect', component: AuthConnectComponent },
  { path: 'auth/callback/:serviceType', component: AuthCallbackComponent },

  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: ':serviceType/:org', component: DashboardComponent, canActivate: [AuthGuard] },

  { path: ':serviceType/:org/create', component: ProjectCreateComponent, canActivate: [AuthGuard] },
  { path: ':serviceType/:org/:repo/edit', component: ProjectEditComponent, canActivate: [AuthGuard] },
  { path: ':serviceType/:org/:repo/pr/:prNumber', component: ProjectDeployComponent, canActivate: [AuthGuard] },
  { path: ':serviceType/:org/:repo/pr/:prNumber/:jobId', component: ProjectDeployLogsComponent, canActivate: [AuthGuard] },

  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
