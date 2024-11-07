import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IBook, IUser } from '@src/common/types';
import { AuthService } from '@src/services/auth.service';
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
  private destroy$ = new Subject();

  constructor(private router: Router, private authservice: AuthService) {}
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
    if (this.isAuth) this.showModal(event);
    else this.router.navigateByUrl('auth');
  }

  showModal(event?: Event) {
    event?.stopPropagation();
    this.show = !this.show;
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
