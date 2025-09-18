import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';
import { correlationIdInterceptor } from './core/interceptors/correlation-id.interceptor';
import { provideAuth, LogLevel } from 'angular-auth-oidc-client';
import { AuthInterceptor } from 'angular-auth-oidc-client';
import { environment } from '../environments/environment';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(withInterceptors([correlationIdInterceptor]), withInterceptorsFromDi()),
    provideAuth({
      config: {
        authority: '/realms/blog',
        redirectUrl: window.location.origin,
        postLogoutRedirectUri: window.location.origin,
        clientId: 'spa-blog',
        scope: 'openid profile email offline_access',
        responseType: 'code',
        silentRenew: false,
        useRefreshToken: false,
        logLevel: LogLevel.Debug,
        secureRoutes: [environment.serviceUrl],
        autoUserInfo: true
      },
    }),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
};
