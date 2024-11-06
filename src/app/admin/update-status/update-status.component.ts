import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IBorrow, Status } from '../../interfaces/IBorrow';
import { AppStateShape } from '../../store';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import * as BorrowActionsTypes from '../../store/borrow/borrow.actions';
import { UserToBookService } from '../../services/user-to-book.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-update-status',
  templateUrl: './update-status.component.html',
  styleUrl: './update-status.component.css',
})
export class UpdateStatusComponent {
  borrowList$ = this.store.select(({ appState }) => appState.borrow);
  isLoading!: boolean;
  isError!: null | string;
  confirmUpdate = false;

  @Input()
  borrow!: IBorrow;
  @Output()
  statusUpdate = new EventEmitter();
  possibleStatus: Status[] = [];
  selectedStatus!: Status;
  pageDirection!: 'rtl' | 'ltr';

  private destroy$ = new Subject();

  constructor(
    private store: Store<{ appState: AppStateShape }>,
    private userToBookService: UserToBookService,
    private translate: TranslateService
  ) {}
  ngOnInit(): void {
    this.pageDirection = this.translate.currentLang == 'ar' ? 'rtl' : 'ltr';

    this.possibleStatus = this.userToBookService.getStatusProperties(
      this.borrow.status
    );

    this.borrowList$.pipe(takeUntil(this.destroy$)).subscribe((borrowList) => {
      this.isLoading = borrowList.loading;
      this.isError = borrowList.error;
      if (!this.isLoading && !this.isError && this.confirmUpdate) {
        this.statusUpdate.emit();
      }
    });
  }
  onUpdateStatus() {
    this.store.dispatch(
      BorrowActionsTypes.update({
        borrowId: this.borrow.userToBookId,
        status: this.selectedStatus,
      })
    );
    this.confirmUpdate = true;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
