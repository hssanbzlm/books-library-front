import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { BorrowListComponent } from './borrow-list/borrow-list.component';
import { BookListComponent } from './book-list/book-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { BasicTableComponent } from '../shared/basic-table/basic-table.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { AddBookComponent } from './add-book/add-book.component';
import { UpdateBookComponent } from './update-book/update-book.component';
import { ModalComponent } from '../shared/modal/modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteBookComponent } from './delete-book/delete-book.component';
import { DynamicButtonComponent } from './dynamic-button/dynamic-button.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    BorrowListComponent,
    BookListComponent,
    UserListComponent,
    AddUserComponent,
    UpdateUserComponent,
    AddBookComponent,
    UpdateBookComponent,
    DeleteBookComponent,
    DynamicButtonComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NavbarComponent,
    BasicTableComponent,
    ModalComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [HomeComponent],
})
export class AdminModule {}
