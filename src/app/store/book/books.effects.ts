import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BookService } from '@src/services/book.service';
import { catchError, map, mergeMap, of } from 'rxjs';
import * as BooksActions from './books.actions';

@Injectable({
  providedIn: 'root',
})
export class BooksEffects {
  initBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BooksActions.init),
      mergeMap(() => {
        return this.bookService.getBooks().pipe(
          map((books) => ({ type: '[Book] Init success', books })),
          catchError(() =>
            of(BooksActions.initError({ payload: 'Error loading book list' }))
          )
        );
      })
    )
  );

  addBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BooksActions.add),
      mergeMap(({ book }) => {
        return this.bookService.addBook(book).pipe(
          map((book) => BooksActions.addSuccess({ book })),
          catchError(() =>
            of(BooksActions.addError({ payload: 'Error adding this book' }))
          )
        );
      })
    )
  );

  updateBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BooksActions.update),
      mergeMap(({ book, id }) => {
        return this.bookService.updateBook(id, book).pipe(
          map((book) => BooksActions.updateSuccess({ book })),
          catchError(() =>
            of(
              BooksActions.updateError({ payload: 'Error updating this book' })
            )
          )
        );
      })
    )
  );

  removeBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BooksActions.remove),
      mergeMap(({ payload }) => {
        return this.bookService.removeBook(payload).pipe(
          map(() => BooksActions.removeSuccess({ payload })),
          catchError(() => of(BooksActions.removeError()))
        );
      })
    )
  );

  constructor(private actions$: Actions, private bookService: BookService) {}
}
