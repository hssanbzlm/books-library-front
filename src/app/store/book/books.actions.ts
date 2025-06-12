import { createAction, props } from '@ngrx/store';
import { IBook,createBookDto, updateBookDto } from '@src/common/types';

export const init = createAction('[Book] Init');
export const initSuccess = createAction(
  '[Book] Init success',
  props<{ books: IBook[] }>()
);
export const initError = createAction(
  '[Book] Init error',
  props<{ payload: string }>()
);

export const add = createAction('[Book] Add', props<{ book: createBookDto,cover:File }>());
export const addSuccess = createAction(
  '[Book] Add success',
  props<{ book: IBook }>()
);
export const addError = createAction(
  '[Book] Add error',
  props<{ payload: string }>()
);

export const update = createAction(
  '[Book] Update',
  props<{ book: updateBookDto; id: number,cover:File }>()
);

export const updateSuccess = createAction(
  '[Book] Update success',
  props<{ book: IBook }>()
);

export const updateError = createAction(
  '[Book] Update error',
  props<{ payload: string }>()
);

export const remove = createAction(
  '[Book] Remove',
  props<{ payload: number }>()
);
export const removeSuccess = createAction(
  '[Book] Remove success',
  props<{ payload: number }>()
);
export const removeError = createAction('[Book] Remove error');
