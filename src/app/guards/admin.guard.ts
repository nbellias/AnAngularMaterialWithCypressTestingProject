import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const currentUser = authService.currentUserValue;

  if (currentUser && currentUser.roles.includes('admin')) {
    return true;
  }

  // Not admin so redirect to user dashboard
  router.navigate(['/dashboard']);
  return false;
};
