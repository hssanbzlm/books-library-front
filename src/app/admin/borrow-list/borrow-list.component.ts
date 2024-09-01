import { Component } from '@angular/core';
import { UserToBookService } from '../../services/user-to-book.service';
import { IBorrow } from '../../interfaces/IBorrow';

@Component({
  selector: 'app-borrow-list',
  templateUrl: './borrow-list.component.html',
  styleUrl: './borrow-list.component.css',
})
export class BorrowListComponent {
  borrowList!: IBorrow[];
  columns = [
    { column: 'id book', dataKey: 'bookId' },
    { column: 'book title', dataKey: 'bookTitle' },
    { column: 'start date', dataKey: 'startDate' },
    { column: 'end date', dataKey: 'endDate' },
    { column: 'email', dataKey: 'email' },
    { column: 'name', dataKey: 'userName' },
    { column: 'last name', dataKey: 'userLastName' },
    { column: 'status', dataKey: 'status' },
  ];

  constructor(private userToBookService: UserToBookService) {
    this.getBorrowList();
  }

  getBorrowList() {
    this.userToBookService.borrowList().subscribe({
      next: (response) => {
        this.borrowList = response.map((value) => ({
          ...value,
          userId: value.user.id,
          userName: value.user.name,
          userLastName: value.user.lastName,
          email: value.user.email,
          bookId: value.book.id,
          bookTitle: value.book.title,
        }));
      },
      error: (error) => {
        this.borrowList = error;
      },
    });
  }
}
