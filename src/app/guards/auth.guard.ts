import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { take, map, catchError } from 'rxjs';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.whoami().pipe(
    take(1),
    map((user) => {
      if (user && user.active) return true;
      return false;
    }),
    catchError((err) => {
      return router.navigateByUrl('auth');
    })
  );
};
