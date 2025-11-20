import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { ExtraOptions, provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { LOCALE_ID } from '@angular/core';

registerLocaleData(localeRu)

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes, withInMemoryScrolling({
    scrollPositionRestoration: 'top',anchorScrolling: 'enabled'
  })), provideHttpClient(), provideAnimations(), providePrimeNG({
    theme: {
      preset: Aura
    }
  }), { provide: LOCALE_ID, useValue: 'ru' }]
};
