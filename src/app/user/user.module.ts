import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';

import { BookListComponent } from './book-list/book-list.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { BookComponent } from './book/book.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BorrowHistoryComponent } from './borrow-history/borrow-history.component';
import { ModalComponent } from '../modal/modal.component';
@NgModule({
  declarations: [
    HomeComponent,
    BookListComponent,
    BookComponent,
    BookDetailsComponent,
    BorrowHistoryComponent,
  ],
  imports: [CommonModule, RouterModule, NavbarComponent, ModalComponent],
})
export class UserModule {}
