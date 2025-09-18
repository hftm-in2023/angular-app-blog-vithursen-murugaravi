import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MockAuthService } from './mock-auth.service';

export const mockAuthGuard: CanActivateFn = () => {
  const mockAuth = inject(MockAuthService);
  const router = inject(Router);

  if (mockAuth.isAuthenticated() && mockAuth.hasRole('user', 'spa-blog')) {
    return true;
  } else {
    router.navigateByUrl('/');
    return false;
  }
};
