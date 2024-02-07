import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { enableProdMode, importProvidersFrom } from "@angular/core";

import { HttpClientModule } from "@angular/common/http";


import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimationsAsync(), importProvidersFrom(HttpClientModule)],

};
