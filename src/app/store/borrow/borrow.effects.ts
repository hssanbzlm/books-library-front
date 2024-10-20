import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as BorrowActionsTypes from './borrow.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { UserToBookService } from '../../services/user-to-book.service';
import { IBorrow } from '../../interfaces/IBorrow';
import { format } from 'date-fns';

@Injectable({
  providedIn: 'root',
})
export class BorrowEffects {
  initBorrow$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BorrowActionsTypes.init),
      mergeMap(() => {
        return this.userToBookService.borrowList().pipe(
          map((borrowList) => ({
            type: '[Borrow] Init success',
            borrow: borrowList,
          })),
          catchError(() =>
            of({
              type: '[Borrow] Init error',
              payload: 'Error loading borrow list',
            })
          )
        );
      })
    )
  );
  updateBorrowStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BorrowActionsTypes.update),
      mergeMap(({ borrowId, status }) => {
        return this.userToBookService.updateBorrow(borrowId, status).pipe(
          map((updatedBorrow: any) => ({
            type: '[Borrow] Update success',
            borrow: {
              ...updatedBorrow[0],
              endDate: format(updatedBorrow[0].endDate, 'dd-MM-yyyy'),
              startDate: format(updatedBorrow[0].startDate, 'dd-MM-yyyy'),
            },
          })),
          catchError(() =>
            of({
              type: '[Borrow] Update error',
              payload: 'Error updating this borrow status',
            })
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
