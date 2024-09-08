import { Component } from '@angular/core';
import { UserToBookService } from '../../services/user-to-book.service';
import { IBorrow } from '../../interfaces/IBorrow';

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
    this.userToBookService.borrowList().subscribe({
      next: (response) => {
        this.borrowList = response;
      },
      error: (error) => {
        this.borrowList = error;
      },
    });
  }
}
