import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterModule } from '@angular/router';
import {importProvidersFrom} from '@angular/core'
import { FormsModule } from '@angular/forms';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './app/login/login.component';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent,{
  providers:[
    provideRouter(routes),
    importProvidersFrom(FormsModule),
    importProvidersFrom(RouterModule.forRoot(routes)),
    importProvidersFrom(HttpClientModule)  ]

}).catch((err) => console.error(err));
