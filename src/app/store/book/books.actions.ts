import { createAction, props } from '@ngrx/store';
import { IBook } from '../../interfaces/IBook';

export const init = createAction('[Book] Init');
export const initSuccess = createAction(
  '[Book] Init success',
  props<{ books: IBook[] }>()
);
export const initError = createAction(
  '[Book] Init error',
  props<{ payload: string }>()
);
