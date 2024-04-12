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
  })),

  on(UsersActionsTypes.remove, (state) => ({
    ...state,
    error: null,
    loading: true,
  })),

  on(UsersActionsTypes.removeSuccess, (state, { payload }) => {
    return {
      ...state,
      loading: false,
      userList: state.userList.filter((user) => user.id != payload),
    };
  }),

  on(UsersActionsTypes.removeError, (state) => ({
    ...state,
    loading: false,
    error: 'Error while removing the resource',
  })),

  on(UsersActionsTypes.updateActivity, (state) => ({
    ...state,
    error: null,
    loading: true,
  })),

  on(UsersActionsTypes.updateActivitySuccess, (state, { payload }) => {
    return {
      ...state,
      loading: false,
      userList: state.userList.map((user) =>
        user.id == payload.userId ? { ...user, active: payload.activity } : user
      ),
    };
  }),

  on(UsersActionsTypes.updateActivityError, (state) => ({
    ...state,
    loading: false,
    error: 'Error while updating this user',
  }))
);
