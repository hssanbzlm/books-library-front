import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';

import { BookListComponent } from './book-list/book-list.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { BookComponent } from './book/book.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BorrowHistoryComponent } from './borrow-history/borrow-history.component';
import { ModalComponent } from '../shared/modal/modal.component';
import {
  MatDateRangePicker,
  MatDateRangeInput,
  MatDatepickerToggle,
} from '@angular/material/datepicker';
import { MatHint } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { MatFormField } from '@angular/material/form-field';
import { MatStartDate } from '@angular/material/datepicker';
import { MatEndDate } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BorrowRequestComponent } from './borrow-request/borrow-request.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BasicTableComponent } from '../shared/basic-table/basic-table.component';
import { FullScreenLoaderComponent } from '@src/shared/full-screen-loader/full-screen-loader.component';
import { BaseSnackbarComponent } from '@src/shared/base-snackbar/base-snackbar.component';
import { UpdateBorrowComponent } from './update-borrow/update-borrow.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent,
    BookListComponent,
    BookComponent,
    BookDetailsComponent,
    BorrowHistoryComponent,
    BorrowRequestComponent,
    UpdateBorrowComponent,
  ],
  imports: [
    BasicTableComponent,
    CommonModule,
    RouterModule,
    NavbarComponent,
    ModalComponent,
    MatDateRangePicker,
    MatDateRangeInput,
    MatDatepickerToggle,
    MatHint,
    MatLabel,
    MatFormField,
    MatStartDate,
    MatEndDate,
    MatFormFieldModule,
    MatPaginatorModule,
    FullScreenLoaderComponent,
    BaseSnackbarComponent,
    FormsModule,
  ],
})
export class UserModule {}
