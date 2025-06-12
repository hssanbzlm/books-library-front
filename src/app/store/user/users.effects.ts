import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '@src/services/user.service';
import { catchError, map, mergeMap, of } from 'rxjs';
import { Injectable } from '@angular/core';
import * as UserActions from './users.actions';
@Injectable({ providedIn: 'root' })
export class UsersEffects {
  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.add),
      mergeMap(({ user }) => {
        return this.usersService.addUser(user).pipe(
          map(({data}) => UserActions.addUserSuccess({ payload: data!.signup })),
          catchError(() =>
            of(
              UserActions.addUserError({
                payload: 'Error while adding this user',
              })
            )
          )
        );
      })
    )
  );

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.init),
      mergeMap(() => {
        return this.usersService.getUsers().pipe(
          map(({data}) => UserActions.initSuccess({ users:data.users })),
          catchError(() =>
            of(UserActions.initError({ payload: 'Error while loading users' }))
          )
        );
      })
    )
  );

  removeUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.remove),
      mergeMap(({ payload }) => {
        return this.usersService.removeUser(payload).pipe(
          map(() => UserActions.removeSuccess({ payload })),
          catchError(() => of(UserActions.removeError()))
        );
      })
    )
  );

  updateUserActivity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateActivity),
      mergeMap(({ payload }) => {
        return this.usersService
          .updateUserActivity(payload.userId, {
            active: payload.activity,
          })
          .pipe(
            map(() => UserActions.updateActivitySuccess({ payload })),
            catchError(() => of(UserActions.updateActivityError()))
          );
      })
    )
  );
  constructor(private actions$: Actions, private usersService: UserService) {}
}
