import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthConnectComponent } from './auth-connect/auth-connect.component';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
import { ApiService } from './services/api.service';
import { DashboardComponent } from './dashboard/dashboard.component';

import { JwtModule } from '@auth0/angular-jwt';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';


import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { ProjectDeployComponent } from './project-deploy/project-deploy.component';
import { HeaderComponent } from './partials/header/header.component';
import { LeftMenuComponent } from './partials/left-menu/left-menu.component';
import { FooterComponent } from './partials/footer/footer.component';


export function getToken() {
  return localStorage.getItem('id_token');
}


@NgModule({
  declarations: [
    AppComponent,
    AuthConnectComponent,
    AuthCallbackComponent,
    DashboardComponent,
    ProjectCreateComponent,
    ProjectEditComponent,
    ProjectDeployComponent,
    HeaderComponent,
    LeftMenuComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: getToken,
        authScheme: 'JWT ',
        whitelistedDomains: ['packagr.io', 'beta.packagr.io', 'localhost:4000', 'localhost:3000'],
        blacklistedRoutes: [],
        throwNoTokenError: true,
        skipWhenExpired: true
      }
    }),
    BsDropdownModule.forRoot()


  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    // Add an icon to the library for convenient access in other components
    library.add(fas, far, fab); // TODO: we should explicitly state which icons to load.
  }
}
