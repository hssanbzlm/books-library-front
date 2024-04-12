import { combineReducers } from '@ngrx/store';
import { BookStateShape, bookReducer } from './book/books.reducers';
import { UsersStateShape, userReducer } from './user/users.reducer';

export interface AppStateShape {
  books: BookStateShape;
  users: UsersStateShape;
}
export const reducers = combineReducers({
  users: userReducer,
  books: bookReducer,
});
