import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { IUser } from '../../interfaces/IUser';
import { AppStateShape } from '../../store';
import { Store } from '@ngrx/store';
import { IBook } from '../../interfaces/IBook';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css',
})
export class BookDetailsComponent {
  show = false;
  isAuth!: IUser | null;
  book$!: Observable<IBook | undefined>;
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

    this.authService.getAuthListener().subscribe((v) => {
      this.isAuth = v;
    });
  }

  onBorrow() {
    if (this.isAuth) this.showModal();
    else this.router.navigateByUrl('auth');
  }

  showModal() {
    this.show = !this.show;
  }
}
