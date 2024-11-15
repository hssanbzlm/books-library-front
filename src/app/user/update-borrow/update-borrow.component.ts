import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  DateRange,
  MatDatepickerInputEvent,
} from '@angular/material/datepicker';
import { Store } from '@ngrx/store';
import { IBorrow } from '@src/common/types';
import { AppStateShape } from '@src/store';
import { Subject, takeUntil } from 'rxjs';
import * as BorrowActionsTypes from '@src/store/borrow/borrow.actions';
import { parse } from 'date-fns';

@Component({
  selector: 'app-update-borrow',
  templateUrl: './update-borrow.component.html',
  styleUrl: './update-borrow.component.css',
})
export class UpdateBorrowComponent {
  borrowList$ = this.store.select(({ appState }) => appState.borrow);
  private destroy$ = new Subject();

  @Input()
  borrow!: IBorrow;
  @Output()
  updateUserBorrow = new EventEmitter();

  isSuccess = false;
  isError!: null | string;
  newBorrow!: IBorrow;
  isLoading!: boolean;
  confirmUpdate = false;
  selectedStartDate!: any;
  selectedEndDate!: Date;
  constructor(private store: Store<{ appState: AppStateShape }>) {}
  ngOnInit(): void {
    this.newBorrow = { ...this.borrow };
    this.selectedStartDate = parse(
      this.newBorrow.startDate,
      'dd/MM/yyyy',
      new Date()
    );

    this.selectedEndDate = parse(
      this.newBorrow.endDate,
      'dd/MM/yyyy',
      new Date()
    );

    this.borrowList$.pipe(takeUntil(this.destroy$)).subscribe((borrowList) => {
      this.isLoading = borrowList.loading;
      this.isError = borrowList.error;
      if (!this.isLoading && !this.isError && this.confirmUpdate) {
        this.updateUserBorrow.emit();
      }
    });
  }

  showModal(event?: Event) {
    event?.stopPropagation();
  }
  onStartChange(event: MatDatepickerInputEvent<any, DateRange<any>>) {
    this.newBorrow.startDate = new Date(event.value).toLocaleDateString();
  }
  onEndChange(event: MatDatepickerInputEvent<any, DateRange<any>>) {
    this.newBorrow.endDate = new Date(event.value).toLocaleDateString();
  }
  confirmRequest() {
    this.store.dispatch(
      BorrowActionsTypes.updateUserBorrow({
        borrowId: this.newBorrow.userToBookId,
        startDate: this.newBorrow.startDate,
        endDate: this.newBorrow.endDate,
      })
    );
    this.confirmUpdate = true;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
