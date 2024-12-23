import { Component } from '@angular/core';
import { IBorrow } from '@src/common/types';
import { Store } from '@ngrx/store';
import { AppStateShape } from '@src/store';

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
    { column: 'created date', dataKey: 'createdDate' },
    { column: 'book title', dataKey: 'bookTitle' },
    { column: 'start date', dataKey: 'startDate' },
    { column: 'end date', dataKey: 'endDate' },
    { column: 'status', dataKey: 'status' },
  ];
  showUpdateBorrowModal = false;
  showCancelBorrowModal = false;
  updatingBorrow!: IBorrow;
  cancelingBorrow!: IBorrow;

  constructor(private store: Store<{ appState: AppStateShape }>) {}
  onEditBorrow(borrow: IBorrow) {
    this.updatingBorrow = borrow;
    this.toggleUpdateBorrowModal();
  }
  onDeleteBorrow(borrow: IBorrow) {
    this.cancelingBorrow = borrow;
    this.toggleCancelBorrowModal();
  }

  toggleUpdateBorrowModal() {
    this.showUpdateBorrowModal = !this.showUpdateBorrowModal;
  }
  toggleCancelBorrowModal() {
    this.showCancelBorrowModal = !this.showCancelBorrowModal;
  }
  handleUpdateBorrow() {
    this.toggleUpdateBorrowModal();
  }
  handleCancelBorrow() {
    this.toggleCancelBorrowModal();
  }
}
