import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BookService } from '../../services/book.service';
import * as BooksActionsTypes from './books.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BooksEffects {
  initBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BooksActionsTypes.init),
      mergeMap(() => {
        return this.bookService.getBooks().pipe(
          map((books) => ({ type: '[Book] Init success', books })),
          catchError(() =>
            of({
              type: '[Book] Init error',
              payload: 'Error loading book list',
            })
          )
        );
      })
    )
  );

  addBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BooksActionsTypes.add),
      mergeMap(({ book }) => {
        return this.bookService.addBook(book).pipe(
          map((book) => ({ type: '[Book] Add success', book })),
          catchError(() =>
            of({ type: '[Book] Add error', payload: 'Error adding this book' })
          )
        );
      })
    )
  );

  constructor(private actions$: Actions, private bookService: BookService) {}
}
