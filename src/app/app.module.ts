import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Third Party Components/Directives
import { JwtModule } from '@auth0/angular-jwt';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { MomentModule } from 'ngx-moment';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

// Application Components/Services/Modules
import { ApiService } from './services/api.service';
import { AuthConnectComponent } from './auth-connect/auth-connect.component';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { ProjectDeployComponent } from './project-deploy/project-deploy.component';
import { HeaderComponent } from './partials/header/header.component';
import { LeftMenuComponent } from './partials/left-menu/left-menu.component';
import { FooterComponent } from './partials/footer/footer.component';
import { PlaceholderLoadingComponent } from './partials/placeholder-loading/placeholder-loading.component';
import { PlaceholderErrorComponent } from './partials/placeholder-error/placeholder-error.component';
import { PlaceholderEmptyComponent } from './partials/placeholder-empty/placeholder-empty.component';
import { ProjectDeployLogsComponent } from './project-deploy-logs/project-deploy-logs.component';
import { LoadingButtonComponent } from './partials/loading-button/loading-button.component';


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
    FooterComponent,
    PlaceholderLoadingComponent,
    PlaceholderErrorComponent,
    PlaceholderEmptyComponent,
    ProjectDeployLogsComponent,
    LoadingButtonComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: getToken,
        authScheme: 'JWT ',
        whitelistedDomains: ['api.packagr.io', 'localhost:3000', 'www.packagr.io', 'beta.packagr.io', 'localhost:4000'],
        blacklistedRoutes: [],
        throwNoTokenError: false,
        skipWhenExpired: true
      }
    }),
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    TypeaheadModule.forRoot(),
    MomentModule,
    InfiniteScrollModule
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
