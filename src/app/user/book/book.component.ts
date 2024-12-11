import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IBook, IUser } from '@src/common/types';
import { AuthService } from '@src/services/auth.service';
import { UserToBookService } from '@src/services/user-to-book.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.css',
})
export class BookComponent {
  @Input() book!: IBook;
  show = false;
  isAuth!: IUser | null;
  isCheckingAvailabitly = false;
  showSnackBar = false;
  snackBarMessage!: string;
  private destroy$ = new Subject();

  constructor(
    private router: Router,
    private authservice: AuthService,
    private userToBookService: UserToBookService
  ) {}
  ngOnInit(): void {
    this.authservice
      .getAuthListener()
      .pipe(takeUntil(this.destroy$))
      .subscribe((auth) => {
        this.isAuth = auth;
      });
  }
  toBookDetails() {
    this.router.navigate(['user', 'book', this.book.id]);
  }
  borrow(event: Event) {
    event.stopPropagation();
    if (this.isAuth) {
      this.isCheckingAvailabitly = true;
      this.showSnackBar = false;
      this.userToBookService.isReadyToBorrow(this.book.id).subscribe({
        next: () => {
          this.isCheckingAvailabitly = false;
          this.showModal(event);
        },
        error: ({ error }) => {
          this.isCheckingAvailabitly = false;
          this.showSnackBar = true;
          this.snackBarMessage = error.message;
        },
      });
    } else {
      this.authservice.setRedirectUrl(`user/book/${this.book.id}`);
      this.router.navigateByUrl('auth');
    }
  }

  showModal(event?: Event) {
    event?.stopPropagation();
    this.show = !this.show;
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
