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
          map(({data}) => ({ type: '[Book] Init success', books:data.books })),
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
      mergeMap(({book,cover}) => {
        return this.bookService.addBook(book,cover).pipe(
          map(({data}) => BooksActions.addSuccess({ book:data!.addBook })),
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
      mergeMap(({ book, id,cover }) => {
        return this.bookService.updateBook(id, book,cover).pipe(
          map(({data}) => { 
            return BooksActions.updateSuccess({ book:data!.updateBook })}),
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
