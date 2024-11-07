import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@src/services/auth.service';
import { IUser, IBook } from '@src/common/types';
import { AppStateShape } from '@src/store';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css',
})
export class BookDetailsComponent {
  show = false;
  isAuth!: IUser | null;
  book$!: Observable<IBook | undefined>;
  private destroy$ = new Subject();
  @Input('id') bookId!: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private store: Store<{ appState: AppStateShape }>
  ) {}
  ngOnInit(): void {
    this.book$ = this.store.select(({ appState }) =>
      appState.books.bookList.find((book) => book.id == +this.bookId)
    );

    this.authService
      .getAuthListener()
      .pipe(takeUntil(this.destroy$))
      .subscribe((auth) => {
        this.isAuth = auth;
      });
  }

  onBorrow() {
    if (this.isAuth) this.showModal();
    else this.router.navigateByUrl('auth');
  }

  showModal() {
    this.show = !this.show;
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
