import { createReducer, on } from '@ngrx/store';
import { IBook } from '../../interfaces/IBook';
import * as BookActionsTypes from './books.actions';
export interface BookStateShape {
  bookList: IBook[];
  error: string | null;
  loading: boolean;
}

const initialBookState: BookStateShape = {
  bookList: [],
  error: null,
  loading: false,
};

export const bookReducer = createReducer(
  initialBookState,
  on(BookActionsTypes.init, (state) => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }),
  on(BookActionsTypes.initSuccess, (state, { books }) => {
    return {
      error: null,
      bookList: books,
      loading: false,
    };
  }),
  on(BookActionsTypes.initError, (state, { payload }) => {
    return {
      ...state,
      loading: false,
      error: payload,
    };
  })
);
