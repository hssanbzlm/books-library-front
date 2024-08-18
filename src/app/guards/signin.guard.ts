import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { take, map, catchError, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const signinGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.whoami().pipe(
    take(1),
    map((user) => {
      if (user && user.active) return router.navigateByUrl('user');
      return true;
    }),
    catchError((err) => {
      return new Promise((resolve) => resolve(true));
    })
  );
};
