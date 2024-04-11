import { Actions, act, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../services/user.service';
import { init, initError, initSuccess } from './users.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class UsersEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(init),
      mergeMap(() => {
        return this.usersService.getUsers().pipe(
          map((users) => ({ type: '[User] Init success', users })),
          catchError(() => of({ type: initError }))
        );
      })
    )
  );
  constructor(private actions$: Actions, private usersService: UserService) {}
}
