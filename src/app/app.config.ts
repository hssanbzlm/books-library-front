import {
  APP_INITIALIZER,
  ApplicationConfig,
  isDevMode,
  inject,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import {
  provideHttpClient,
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { provideStore, provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { UsersEffects } from './store/user/users.effects';
import { BooksEffects } from './store/book/books.effects';
import { reducers } from './store';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideNativeDateAdapter } from '@angular/material/core';
import { BorrowEffects } from './store/borrow/borrow.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideTranslateService, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateFacadeService } from './services/translate-facade.service';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { AuthService } from './services/auth.service';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import extractFiles from 'extract-files/extractFiles.mjs';
import isExtractableFile from 'extract-files/isExtractableFile.mjs';
import { environment } from '../environments/environment';


const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (
  http: HttpClient
) => new TranslateHttpLoader(http, './assets/i18n/', '.json');
const authInit = (authService: AuthService) => {
  return () => authService.fetchWhoAmi();
};
export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: authInit,
      deps: [AuthService],
      multi: true,
    },
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
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideTranslateService({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    provideTranslateService({
      loader: {
        provide: MatPaginatorIntl,
        useClass: TranslateFacadeService,
      },
    }),
    provideHttpClient(),
    provideApollo(() => {
      const httpLink = inject(HttpLink);

      return {
        link: httpLink.create({
          uri: environment.graphql,
          withCredentials: true,
          extractFiles: (body) => extractFiles(body, isExtractableFile),
          headers: new HttpHeaders().set('apollo-require-preflight','true'),
        }),
        cache: new InMemoryCache(),
      };
    }),
  ],
};
