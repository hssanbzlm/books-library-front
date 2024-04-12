import { Actions, act, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../services/user.service';
import {
  add,
  init,
  initError,
  initSuccess,
  remove,
  removeError,
  updateActivity,
} from './users.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class UsersEffects {
  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(add),
      mergeMap(({ user }) => {
        return this.usersService.addUser(user).pipe(
          map((user) => ({ type: '[User] Add success', payload: user })),
          catchError(() =>
            of({
              type: '[User] Add error',
              payload: 'Error while adding this user',
            })
          )
        );
      })
    )
  );

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

  updateUserActivity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateActivity),
      mergeMap(({ payload }) => {
        return this.usersService
          .updateUserActivity(payload.userId, {
            active: payload.activity,
          })
          .pipe(
            map(() => ({
              type: '[User] Update activity success',
              payload,
            })),
            catchError(() => of({ type: '[User] Update activity error' }))
          );
      })
    )
  );
  constructor(private actions$: Actions, private usersService: UserService) {}
}
