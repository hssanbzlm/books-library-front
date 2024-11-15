import { createReducer, on } from '@ngrx/store';
import { IBorrow } from '@src/common/types';
import * as BorrowActionsTypes from './borrow.actions';

export interface BorrowStateShape {
  borrowList: IBorrow[];
  error: string | null;
  loading: boolean;
}

const initialBorrowState: BorrowStateShape = {
  borrowList: [],
  error: null,
  loading: false,
};
export const borrowReducer = createReducer(
  initialBorrowState,

  on(BorrowActionsTypes.init, (state) => ({
    ...state,
    error: null,
    loading: true,
  })),
  on(BorrowActionsTypes.initError, (state, { payload }) => ({
    ...state,
    loading: false,
    error: payload,
  })),
  on(BorrowActionsTypes.initSuccess, (state, { borrow }) => ({
    borrowList: borrow,
    loading: false,
    error: null,
  })),
  on(BorrowActionsTypes.update, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(BorrowActionsTypes.updateSuccess, (state, { borrow }) => ({
    loading: false,
    error: null,
    borrowList: state.borrowList.map((localBorrow) => {
      return localBorrow.userToBookId == borrow.userToBookId
        ? borrow
        : localBorrow;
    }),
  })),
  on(BorrowActionsTypes.updateError, (state, { payload }) => ({
    ...state,
    loading: false,
    error: payload,
  })),
  on(BorrowActionsTypes.updateUserBorrow, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(BorrowActionsTypes.updateUserBorrowSuccess, (state, { borrow }) => ({
    loading: false,
    error: null,
    borrowList: state.borrowList.map((localBorrow) => {
      return localBorrow.userToBookId == borrow.userToBookId
        ? borrow
        : localBorrow;
    }),
  })),
  on(BorrowActionsTypes.updateUserBorrowError, (state, { payload }) => ({
    ...state,
    loading: false,
    error: payload,
  }))
);
