import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, map, take } from 'rxjs';

export const adminGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.whoami().pipe(
    take(1),
    map((user) => {
      if (user && user.active && user.admin) return true;
      return router.navigateByUrl('user');
    }),
    catchError((err) => {
      return router.navigateByUrl('auth');
    })
  );
};
