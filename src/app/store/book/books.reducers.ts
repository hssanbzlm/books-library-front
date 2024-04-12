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
  }),
  on(BookActionsTypes.add, (state) => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }),
  on(BookActionsTypes.addSuccess, (state, { book }) => {
    return {
      loading: false,
      error: null,
      bookList: [...state.bookList, book],
    };
  }),
  on(BookActionsTypes.addError, (state, { payload }) => {
    return {
      ...state,
      loading: false,
      error: payload,
    };
  }),
  on(BookActionsTypes.update, (state) => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }),
  on(BookActionsTypes.updateSuccess, (state, { book }) => {
    return {
      loading: false,
      error: null,
      bookList: state.bookList.map((prevBook) => {
        if (prevBook.id == book.id) return book;
        return prevBook;
      }),
    };
  }),
  on(BookActionsTypes.updateError, (state, { payload }) => {
    return {
      ...state,
      loading: false,
      error: payload,
    };
  }),
  on(BookActionsTypes.remove, (state) => ({
    ...state,
    error: null,
    loading: true,
  })),

  on(BookActionsTypes.removeSuccess, (state, { payload }) => {
    return {
      error: null,
      loading: false,
      bookList: state.bookList.filter((book) => book.id != payload),
    };
  }),

  on(BookActionsTypes.removeError, (state) => ({
    ...state,
    loading: false,
    error: 'Error while removing the resource',
  }))
);
