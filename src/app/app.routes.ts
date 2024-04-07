import { Routes } from '@angular/router';
import { HomeComponent } from './user/home/home.component';
import { SigninComponent } from './shared/signin/signin.component';
import { BookListComponent } from './user/book-list/book-list.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { BookDetailsComponent } from './user/book-details/book-details.component';
import { BorrowHistoryComponent } from './user/borrow-history/borrow-history.component';

export const routes: Routes = [
  { path: '', redirectTo: 'user', pathMatch: 'full' },
  { path: 'auth', component: SigninComponent },
  {
    path: 'user',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'books', pathMatch: 'full' },
      { path: 'books', component: BookListComponent },
      { path: 'book/:id', component: BookDetailsComponent },
      { path: 'borrow-list', component: BorrowHistoryComponent },
    ],
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  { path: '**', component: NotFoundComponent },
];
