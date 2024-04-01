import { Routes } from '@angular/router';
import { HomeComponent } from './user/home/home.component';
import { SigninComponent } from './signin/signin.component';
import { BookListComponent } from './user/book-list/book-list.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: 'user', pathMatch: 'full' },
  {
    path: 'user',
    component: HomeComponent,
    children: [
      { path: '', component: BookListComponent },
      { path: 'signin', component: SigninComponent },
    ],
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  { path: '**', component: NotFoundComponent },
];
