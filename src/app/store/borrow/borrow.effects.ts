import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { UserToBookService } from '@src/services/user-to-book.service';
import { format } from 'date-fns';
import * as BorrowActions from './borrow.actions';
import { IBorrow } from '@src/common/types';

@Injectable({
  providedIn: 'root',
})
export class BorrowEffects {
  initBorrow$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BorrowActions.init),
      mergeMap(() => {
        return this.userToBookService.borrowList().pipe(
          map((borrow) => BorrowActions.initSuccess({ borrow })),
          catchError(() =>
            of(
              BorrowActions.initError({
                payload: 'Error while loading borrow list',
              })
            )
          )
        );
      })
    )
  );
  updateBorrowStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BorrowActions.update),
      mergeMap(({ borrowId, status }) => {
        return this.userToBookService.updateBorrow(borrowId, status).pipe(
          map((updatedBorrow: any) =>
            BorrowActions.updateSuccess({
              borrow: {
                ...updatedBorrow[0],
                endDate: format(updatedBorrow[0].endDate, 'dd/MM/yyyy'),
                startDate: format(updatedBorrow[0].startDate, 'dd/MM/yyyy'),
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
            map((updatedBorrow: IBorrow) =>
              BorrowActions.updateUserBorrowSuccess({
                borrow: {
                  ...updatedBorrow,
                  endDate: format(updatedBorrow.endDate, 'dd/MM/yyyy'),
                  startDate: format(updatedBorrow.startDate, 'dd/MM/yyyy'),
                },
              })
            ),
            catchError(() =>
              of(
                BorrowActions.updateUserBorrowError({
                  payload: 'Error updating this borrow',
                })
              )
            )
          );
      })
    )
  );
  cancelUserBorrow$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BorrowActions.cancelBorrow),
      mergeMap(({ borrowId }) => {
        return this.userToBookService.cancelUserBorrow(borrowId).pipe(
          map((canceledBorrow: IBorrow) =>
            BorrowActions.updateUserBorrowSuccess({
              borrow: {
                ...canceledBorrow,
                endDate: format(canceledBorrow.endDate, 'dd/MM/yyyy'),
                startDate: format(canceledBorrow.startDate, 'dd/MM/yyyy'),
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
  constructor(
    private actions$: Actions,
    private userToBookService: UserToBookService
  ) {}
}
