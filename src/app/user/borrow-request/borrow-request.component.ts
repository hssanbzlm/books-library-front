import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  DateRange,
  MatDatepickerInputEvent,
} from '@angular/material/datepicker';
import { LanguageDirection } from '@src/common/types';
import { TranslateFacadeService } from '@src/services/translate-facade.service';
import { UserToBookService } from '@src/services/user-to-book.service';

@Component({
  selector: 'app-borrow-request',
  templateUrl: './borrow-request.component.html',
  styleUrl: './borrow-request.component.css',
})
export class BorrowRequestComponent {
  @Input()
  bookId!: number;
  @Output()
  onDismiss = new EventEmitter();
  startDate!: string;
  endDate!: string;
  isSuccess = false;
  isError = false;
  minDate = new Date(new Date().setDate(new Date().getDate() + 2));
  maxDate!: Date;
  languageDirecaion!: LanguageDirection;
  constructor(
    private userToBookService: UserToBookService,
    private translateFacade: TranslateFacadeService
  ) {}

  ngOnInit(): void {
    this.updateMaxDate();
    this.translateFacade.getPageDirection().subscribe((pageDirection) => {
      this.languageDirecaion = pageDirection;
    });
  }

  updateMaxDate() {
    if (this.startDate) {
      const start = new Date(this.startDate);
      this.maxDate = new Date(start.setMonth(start.getMonth() + 1));
    }
  }

  showModal(event?: Event) {
    event?.stopPropagation();
    this.onDismiss.emit('dismiss');
  }
  onStartChange(event: MatDatepickerInputEvent<any, DateRange<any>>) {
    this.startDate = new Date(event.value).toLocaleDateString("en-US");
    this.updateMaxDate();
  }
  onEndChange(event: MatDatepickerInputEvent<any, DateRange<any>>) {
    this.endDate = new Date(event.value).toLocaleDateString("en-US");
  }
  confirmRequest() {
    this.userToBookService
      .borrow(this.bookId, this.startDate, this.endDate)
      .subscribe({
        next: (response) => {
          this.isSuccess = true;
        },
        error: (error) => {
          this.isError = true;
        },
      });
  }
}
