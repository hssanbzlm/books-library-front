import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IBook, IUser } from '@src/common/types';
import { AuthService } from '@src/services/auth.service';
import { AppStateShape } from '@src/store';
import { Subject, takeUntil } from 'rxjs';
import * as BorrowBookActions from '../../store/borrow/borrow.actions';

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
  askToBorrow=false;
  isReadyToBorrowError$ = this.store.select(
    ({ appState }) => appState.borrow.isReadyToBorrowerror
  );
  isReadyToBorrowLoading$ = this.store.select(
    ({ appState }) => appState.borrow.isReadyToBorrowloading
  );

  isReadyToBorrowSucceed$ = this.store.select(
    ({ appState }) => appState.borrow.isReadyToBorrowSucceed
  );
  private destroy$ = new Subject();

  constructor(
    private router: Router,
    private authservice: AuthService,
    private store: Store<{ appState: AppStateShape }>
  ) {}
  ngOnInit(): void {
    this.isReadyToBorrowError$
      .pipe(takeUntil(this.destroy$))
      .subscribe((error) => {
        if (error && this.askToBorrow) {
          this.showSnackBar = true;
          this.snackBarMessage = error;
          this.isCheckingAvailabitly = false;
        }
      });
    this.isReadyToBorrowLoading$
      .pipe(takeUntil(this.destroy$))
      .subscribe((isLoading) => {
        if (isLoading) {
          this.showSnackBar = false;
          this.isCheckingAvailabitly = true;
        } else {
          this.isCheckingAvailabitly = false;
        }
      });
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
    this.askToBorrow = true;
    if (this.isAuth) {
      this.store.dispatch(
        BorrowBookActions.isReadyToBorrow({ bookId: this.book.id })
      );
      this.isReadyToBorrowSucceed$.subscribe((ready)=>{
        if(ready){
          this.showModal(event)
        }
      })

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
