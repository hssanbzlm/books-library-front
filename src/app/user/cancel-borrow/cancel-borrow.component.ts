import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { IBorrow } from '@src/common/types';
import { AppStateShape } from '@src/store';
import { Subject, takeUntil } from 'rxjs';
import * as BorrowActionsTypes from '@src/store/borrow/borrow.actions';

@Component({
  selector: 'app-cancel-borrow',
  templateUrl: './cancel-borrow.component.html',
  styleUrl: './cancel-borrow.component.css',
})
export class CancelBorrowComponent {
  @Output()
  cancelBorrow = new EventEmitter();
  borrowList$ = this.store.select(({ appState }) => appState.borrow);
  private destroy$ = new Subject();
  constructor(private store: Store<{ appState: AppStateShape }>) {}

  ngOnInit(): void {
    this.borrowList$.pipe(takeUntil(this.destroy$)).subscribe((borrowList) => {
      this.isLoading = borrowList.loading;
      this.isError = borrowList.error;
      if (!this.isLoading && !this.isError && this.confirmUpdate) {
        this.cancelBorrow.emit();
      }
    });
  }
  @Input()
  borrow!: IBorrow;

  isError: string | null = null;
  isLoading = false;
  confirmUpdate = false;

  confirmRequest() {
    this.store.dispatch(
      BorrowActionsTypes.cancelBorrow({
        borrowId: this.borrow.userToBookId,
      })
    );
    this.confirmUpdate = true;
  }
}
