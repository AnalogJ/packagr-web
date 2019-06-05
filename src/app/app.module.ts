import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthConnectComponent } from './auth-connect/auth-connect.component';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';


import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

@NgModule({
  declarations: [
    AppComponent,
    AuthConnectComponent,
    AuthCallbackComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    // Add an icon to the library for convenient access in other components
    library.add(fas, far, fab); // TODO: we should explicitly state which icons to load.
  }
}
