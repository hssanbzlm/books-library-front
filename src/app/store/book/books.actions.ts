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

export const add = createAction('[Book] Add', props<{ book: FormData }>());
export const addSuccess = createAction(
  '[Book] Add success',
  props<{ book: IBook }>()
);
export const addError = createAction(
  '[Book] Add error',
  props<{ payload: string }>()
);
