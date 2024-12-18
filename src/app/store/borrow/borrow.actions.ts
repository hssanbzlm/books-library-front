import { createAction, props } from '@ngrx/store';
import { IBorrow, Status } from '@src/common/types';

export const init = createAction('[Borrow] Init');
export const initSuccess = createAction(
  '[Borrow] Init success',
  props<{ borrow: IBorrow[] }>()
);
export const initError = createAction(
  '[Borrow] Init error',
  props<{ payload: string }>()
);
export const update = createAction(
  '[Borrow] Update',
  props<{ borrowId: number; status: Status }>()
);

export const updateSuccess = createAction(
  '[Borrow] Update success',
  props<{ borrow: IBorrow }>()
);

export const updateError = createAction(
  '[Borrow] Update error',
  props<{ payload: string }>()
);
export const updateUserBorrow = createAction(
  '[Borrow] Update user borrow',
  props<{ borrowId: number; startDate: string; endDate: string }>()
);

export const updateUserBorrowSuccess = createAction(
  '[Borrow] Update user borrow success',
  props<{ borrow: IBorrow }>()
);

export const updateUserBorrowError = createAction(
  '[Borrow] Update user borrow error',
  props<{ payload: string }>()
);
export const cancelBorrow = createAction(
  '[Borrow] Cancel',
  props<{ borrowId: number }>()
);

export const cancelSuccess = createAction(
  '[Borrow] Cancel success',
  props<{ borrow: IBorrow }>()
);

export const cancelError = createAction(
  '[Borrow] Cancel error',
  props<{ payload: string }>()
);
