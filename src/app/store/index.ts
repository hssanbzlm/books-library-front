import { combineReducers } from '@ngrx/store';
import { BookStateShape, bookReducer } from './book/books.reducers';
import { UsersStateShape, userReducer } from './user/users.reducer';
import { borrowReducer, BorrowStateShape } from './borrow/borrow.reducers';

export interface AppStateShape {
  books: BookStateShape;
  users: UsersStateShape;
  borrow: BorrowStateShape;
}
export const reducers = combineReducers({
  users: userReducer,
  books: bookReducer,
  borrow: borrowReducer,
});
