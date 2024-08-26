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
import { AuthService } from '../../services/auth.service';

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
  constructor(private authService: AuthService) {}

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
    console.log('start date ', this.startDate);
    console.log('end date ', this.endDate);
    console.log('user ', this.authService.getAuthUser()?.id);
    console.log('book ', this.bookId);
  }
}
