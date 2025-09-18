import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { map, tap } from 'rxjs/operators';
import { hasRole } from './roles';

export const isAuthenticatedGuard: CanActivateFn = () => {
  const oidc = inject(OidcSecurityService);
  const router = inject(Router);

  return oidc.checkAuth().pipe(
    map(({ isAuthenticated, userData }) => {
      if (!isAuthenticated) {
        return false;
      }
      // Requires role 'user'
      return hasRole(userData, 'user', 'spa-blog');
    }),
    tap((allowed) => {
      if (!allowed) {
        router.navigateByUrl('/');
      }
    })
  );
};


