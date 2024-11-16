import { Component } from '@angular/core';
import { IBorrow } from '@src/common/types';
import { Store } from '@ngrx/store';
import { AppStateShape } from '@src/store';

@Component({
  selector: 'app-borrow-list',
  templateUrl: './borrow-list.component.html',
  styleUrl: './borrow-list.component.css',
})
export class BorrowListComponent {
  borrowList$ = this.store.select(({ appState }) => appState.borrow.borrowList);
  isLoading$ = this.store.select(({ appState }) => appState.borrow.loading);
  isError$ = this.store.select(({ appState }) => appState.borrow.error);

  updatingBorrow!: IBorrow;
  showUpdateStatusModal = false;
  columns = [
    { column: 'book title', dataKey: 'bookTitle' },
    { column: 'start date', dataKey: 'startDate' },
    { column: 'end date', dataKey: 'endDate' },
    { column: 'email', dataKey: 'email' },
    { column: 'name', dataKey: 'userName' },
    { column: 'last name', dataKey: 'userLastName' },
    { column: 'status', dataKey: 'status' },
  ];

  constructor(private store: Store<{ appState: AppStateShape }>) {}

  onEditStatus(borrow: IBorrow) {
    this.updatingBorrow = borrow;
    this.toggleUpdateStatusModal();
  }
  handleUpdateStatus() {
    this.toggleUpdateStatusModal();
  }
  toggleUpdateStatusModal() {
    this.showUpdateStatusModal = !this.showUpdateStatusModal;
  }
}
