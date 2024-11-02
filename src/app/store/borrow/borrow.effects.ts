import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { UserToBookService } from '../../services/user-to-book.service';
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
                endDate: format(updatedBorrow[0].endDate, 'dd-MM-yyyy'),
                startDate: format(updatedBorrow[0].startDate, 'dd-MM-yyyy'),
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
  constructor(
    private actions$: Actions,
    private userToBookService: UserToBookService
  ) {}
}
