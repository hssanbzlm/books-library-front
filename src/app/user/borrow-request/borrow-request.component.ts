import {
  Component,
  EventEmitter,
  input,
  Input,
  Output,
  output,
} from '@angular/core';
import {
  DateRange,
  MatDatepickerInputEvent,
} from '@angular/material/datepicker';
import { UserToBookService } from '../../services/user-to-book.service';

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
  constructor(private userToBookService: UserToBookService) {}

  showModal(event?: Event) {
    event?.stopPropagation();
    this.onDismiss.emit('dismiss');
  }
  onStartChange(event: MatDatepickerInputEvent<any, DateRange<any>>) {
    this.startDate = new Date(event.value).toLocaleDateString();
  }
  onEndChange(event: MatDatepickerInputEvent<any, DateRange<any>>) {
    this.endDate = new Date(event.value).toLocaleDateString();
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
