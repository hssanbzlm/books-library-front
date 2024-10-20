import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStore, provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { UsersEffects } from './store/user/users.effects';
import { BooksEffects } from './store/book/books.effects';
import { reducers } from './store';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideNativeDateAdapter } from '@angular/material/core';
import { BorrowEffects } from './store/borrow/borrow.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
    provideStore(),
    provideEffects(UsersEffects, BooksEffects, BorrowEffects),
    provideState({
        name: 'appState',
        reducer: reducers,
    }),
    provideAnimations(),
    provideNativeDateAdapter(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
],
};
