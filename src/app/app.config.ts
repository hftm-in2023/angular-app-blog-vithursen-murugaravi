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
        authority: 'https://d-cap-keyclaok.kindbay-711f60b2.westeurope.azurecontainerapps.io/realms/blog',
        redirectUrl: window.location.origin,
        postLogoutRedirectUri: window.location.origin,
        clientId: 'spa-blog',
        scope: 'openid profile email offline_access',
        responseType: 'code',
        silentRenew: true,
        silentRenewUrl: window.location.origin + '/silent-renew.html',
        renewTimeBeforeTokenExpiresInSeconds: 10,
        useRefreshToken: true,
        logLevel: LogLevel.Warn,
        secureRoutes: [environment.serviceUrl],
      },
    }),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
};
