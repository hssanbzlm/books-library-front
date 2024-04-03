import { Routes } from '@angular/router';
import { HomeComponent } from './user/home/home.component';
import { SigninComponent } from './signin/signin.component';
import { BookListComponent } from './user/book-list/book-list.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { BookDetailsComponent } from './user/book-details/book-details.component';

export const routes: Routes = [
  { path: '', redirectTo: 'user', pathMatch: 'full' },
  { path: 'auth', component: SigninComponent },
  {
    path: 'book-list',
    component: HomeComponent,
    children: [
      { path: '', component: BookListComponent },
      { path: 'book/:id', component: BookDetailsComponent },
    ],
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  { path: '**', component: NotFoundComponent },
];
