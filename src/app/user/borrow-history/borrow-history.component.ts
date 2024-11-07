import { Component } from '@angular/core';
import { UserToBookService } from '@src/services/user-to-book.service';
import { IBorrow } from '@src/common/types';
import { take } from 'rxjs';

@Component({
  selector: 'app-borrow-history',
  templateUrl: './borrow-history.component.html',
  styleUrl: './borrow-history.component.css',
})
export class BorrowHistoryComponent {
  borrowList!: IBorrow[];
  columns = [
    { column: 'book title', dataKey: 'bookTitle' },
    { column: 'start date', dataKey: 'startDate' },
    { column: 'end date', dataKey: 'endDate' },
    { column: 'status', dataKey: 'status' },
  ];

  constructor(private userToBookService: UserToBookService) {
    this.getBorrowList();
  }

  getBorrowList() {
    this.userToBookService
      .borrowList()
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.borrowList = response;
        },
        error: (error) => {
          this.borrowList = error;
        },
      });
  }
}
