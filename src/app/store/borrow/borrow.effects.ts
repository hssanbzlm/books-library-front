import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { UserToBookService } from '@src/services/user-to-book.service';
import { format } from 'date-fns';
import * as BorrowActions from './borrow.actions';

@Injectable({
  providedIn: 'root',
})
export class BorrowEffects {
  initBorrow$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BorrowActions.init),
      mergeMap(() => {
        return this.userToBookService.borrowList().pipe(
          map((borrowList) =>
            BorrowActions.initSuccess({ borrow: borrowList })
          ),
          catchError((err) => {
            return of(BorrowActions.initError({ payload: 'error loading' }));
          })
        );
      })
    )
  );
  updateBorrowStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BorrowActions.update),
      mergeMap(({ borrowId, status }) => {
        return this.userToBookService.updateBorrow(borrowId, status).pipe(
          map(({ data }) =>
            BorrowActions.updateSuccess({
              borrow: {
                ...data!.updateBorrow,
                createdDate: format(
                  new Date(+data!.updateBorrow.createdDate),
                  'dd/MM/yyyy'
                ),
                endDate: format(
                  new Date(+data!.updateBorrow.endDate),
                  'dd/MM/yyyy'
                ),
                startDate: format(
                  new Date(+data!.updateBorrow.startDate),
                  'dd/MM/yyyy'
                ),
              },
            })
          ),
          catchError(() =>
            of(
              BorrowActions.updateError({
                payload: 'Error updating this borrow',
              })
            )
          )
        );
      })
    )
  );
  updateUserBorrow$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BorrowActions.updateUserBorrow),
      mergeMap(({ borrowId, startDate, endDate }) => {
        return this.userToBookService
          .updateUserBorrow(borrowId, startDate, endDate)
          .pipe(
            map(({ data }) =>
              BorrowActions.updateUserBorrowSuccess({
                borrow: {
                  ...data!.updateUserBorrow,
                  createdDate: format(
                    new Date(+data!.updateUserBorrow.createdDate),
                    'dd/MM/yyyy'
                  ),
                  endDate: format(
                    new Date(+data!.updateUserBorrow.endDate),
                    'dd/MM/yyyy'
                  ),
                  startDate: format(
                    new Date(+data!.updateUserBorrow.startDate),
                    'dd/MM/yyyy'
                  ),
                },
              })
            ),
            catchError((err) => {
              return of(
                BorrowActions.updateUserBorrowError({
                  payload: 'Error updating this borrow',
                })
              );
            })
          );
      })
    )
  );
  cancelUserBorrow$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BorrowActions.cancelBorrow),
      mergeMap(({ borrowId }) => {
        return this.userToBookService.cancelUserBorrow(borrowId).pipe(
          map(({ data }) =>
            BorrowActions.updateUserBorrowSuccess({
              borrow: {
                ...data!.cancelUserBorrow,
                createdDate: format(
                  new Date(+data!.cancelUserBorrow.createdDate),
                  'dd/MM/yyyy'
                ),
                endDate: format(
                  new Date(+data!.cancelUserBorrow.endDate),
                  'dd/MM/yyyy'
                ),
                startDate: format(
                  new Date(+data!.cancelUserBorrow.startDate),
                  'dd/MM/yyyy'
                ),
              },
            })
          ),
          catchError(() =>
            of(
              BorrowActions.cancelError({
                payload: 'Error canceling this borrow',
              })
            )
          )
        );
      })
    )
  );
  isReadyToBorrow$ = createEffect(() => 
    this.actions$.pipe(ofType(BorrowActions.isReadyToBorrow),
      mergeMap(({ bookId }) => {
        return this.userToBookService.isReadyToBorrow(bookId).pipe(
          map(() =>
            BorrowActions.isReadyToBorrowSuccess()
          ),
          catchError((error) =>
            of(
              BorrowActions.isReadyToBorrowError({
                payload:
                  error?.graphQLErrors?.[0]?.message ||
                  'An unexpected error occurred',
              })
            )
          )
        );
      })
  ));
  constructor(
    private actions$: Actions,
    private userToBookService: UserToBookService
  ) {}
}
