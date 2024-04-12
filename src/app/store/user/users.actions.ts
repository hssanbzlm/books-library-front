import { createAction, props } from '@ngrx/store';
import { IUser } from '../../interfaces/IUser';
export const init = createAction('[User] Init');
export const initSuccess = createAction(
  '[User] Init success',
  props<{ users: IUser[] }>()
);
export const initError = createAction(
  '[User] Init error',
  props<{ payload: string }>()
);

export const remove = createAction(
  '[User] Remove',
  props<{ payload: number }>()
);
export const removeSuccess = createAction(
  '[User] Remove success',
  props<{ payload: number }>()
);
export const removeError = createAction('[User] Remove error');

export const updateActivity = createAction(
  '[User] Update activity',
  props<{ payload: { userId: number; activity: boolean } }>()
);
export const updateActivitySuccess = createAction(
  '[User] Update activity success',
  props<{ payload: { userId: number; activity: boolean } }>()
);
export const updateActivityError = createAction('[User] Update activity error');

export const add = createAction(
  '[User] Add',
  props<{ user: Partial<IUser> }>()
);

export const addUserSuccess = createAction(
  '[User] Add success',
  props<{ payload: IUser }>()
);
export const addUserError = createAction(
  '[User] Add error',
  props<{ payload: string }>()
);

export const update = createAction('[User] Update');
