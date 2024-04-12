import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStore, provideState, combineReducers } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { UsersEffects } from './store/user/users.effects';
import { userReducer } from './store/user/users.reducer';
import { bookReducer } from './store/book/books.reducers';
import { BooksEffects } from './store/book/books.effects';
import { reducers } from './store';
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideStore(),
    provideEffects(UsersEffects, BooksEffects),
    provideState({
      name: 'appState',
      reducer: reducers,
    }),
  ],
};
