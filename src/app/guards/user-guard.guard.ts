import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { take, map, catchError } from 'rxjs';

export const userGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.getAuthListener().pipe(
    take(1),
    map((user) => {
      if (user && user.active && !user.admin) return true;
      if (!user) return true;
      if (user && user.active && user.admin)
        return router.navigateByUrl('admin');
      return true;
    }),
    catchError((err) => {
      return router.navigateByUrl('user');
    })
  );
};
