import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from '../shared/signin/signin.component';
import { UserListComponent } from './user-list/user-list.component';
import { BookListComponent } from './book-list/book-list.component';
import { BorrowListComponent } from './borrow-list/borrow-list.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'signin', component: SigninComponent },
      { path: 'user-list', component: UserListComponent },
      { path: 'book-list', component: BookListComponent },
      { path: 'borrow-list', component: BorrowListComponent },
      { path: 'dashboard', redirectTo: '' },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
