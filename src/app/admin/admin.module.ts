import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { NavbarComponent } from '../user/navbar/navbar.component';
import { BorrowListComponent } from './borrow-list/borrow-list.component';
import { BookListComponent } from './book-list/book-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { BasicTableComponent } from '../basic-table/basic-table.component';

@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    BorrowListComponent,
    BookListComponent,
    UserListComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NavbarComponent,
    BasicTableComponent,
  ],
  exports: [HomeComponent],
})
export class AdminModule {}
