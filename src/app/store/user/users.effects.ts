import { Actions, act, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../services/user.service';
import {
  init,
  initError,
  initSuccess,
  remove,
  removeError,
} from './users.actions';
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

  removeUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(remove),
      mergeMap(({ payload }) => {
        return this.usersService.removeUser(payload).pipe(
          map(() => ({ type: '[User] Remove success', payload })),
          catchError(() => of({ type: '[User] Remove error' }))
        );
      })
    )
  );
  constructor(private actions$: Actions, private usersService: UserService) {}
}
