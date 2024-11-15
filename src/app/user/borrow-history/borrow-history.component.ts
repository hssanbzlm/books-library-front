import { Component } from '@angular/core';
import { UserToBookService } from '@src/services/user-to-book.service';
import { IBorrow } from '@src/common/types';
import { Store } from '@ngrx/store';
import { AppStateShape } from '@src/store';
import * as BorrowActions from '@src/store/borrow/borrow.actions';

@Component({
  selector: 'app-borrow-history',
  templateUrl: './borrow-history.component.html',
  styleUrl: './borrow-history.component.css',
})
export class BorrowHistoryComponent {
  borrowList$ = this.store.select(({ appState }) => appState.borrow.borrowList);
  isLoading$ = this.store.select(({ appState }) => appState.borrow.loading);
  isError$ = this.store.select(({ appState }) => appState.borrow.error);
  columns = [
    { column: 'book title', dataKey: 'bookTitle' },
    { column: 'start date', dataKey: 'startDate' },
    { column: 'end date', dataKey: 'endDate' },
    { column: 'status', dataKey: 'status' },
  ];
  showUpdateBorrowModal = false;
  updatingBorrow!: IBorrow;

  constructor(private store: Store<{ appState: AppStateShape }>) {
    this.getBorrowList();
  }
  onEditBorrow(borrow: IBorrow) {
    this.updatingBorrow = borrow;
    this.toggleUpdateBorrowModal();
  }

  getBorrowList() {
    this.store.dispatch(BorrowActions.init());
  }
  toggleUpdateBorrowModal() {
    this.showUpdateBorrowModal = !this.showUpdateBorrowModal;
  }
  handleUpdateBorrow() {
    this.toggleUpdateBorrowModal();
  }
}
