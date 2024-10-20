import { createAction, props } from '@ngrx/store';
import { IBorrow, Status } from '../../interfaces/IBorrow';

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
