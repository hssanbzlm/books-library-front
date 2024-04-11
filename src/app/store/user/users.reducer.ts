import { createReducer, on } from '@ngrx/store';
import { IUser } from '../../interfaces/IUser';
import * as UsersActionsTypes from './users.actions';

export interface UsersStateShape {
  userList: IUser[];
  error: string | null;
  loading: boolean;
}
const initalUsersState: UsersStateShape = {
  userList: [],
  error: null,
  loading: false,
};
export const userReducer = createReducer(
  initalUsersState,
  on(UsersActionsTypes.init, (state) => ({
    ...state,
    error: null,
    loading: true,
  })),
  on(UsersActionsTypes.initSuccess, (state, { users }) => {
    return {
      ...state,
      loading: false,
      userList: [...users],
    };
  }),
  on(UsersActionsTypes.initError, (state, { payload }) => ({
    ...state,
    loading: false,
    error: payload,
  }))
);
