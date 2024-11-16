import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserModule } from './user/user.module';
import { SigninComponent } from './shared/signin/signin.component';
import { AppStateShape } from './store';
import { Store } from '@ngrx/store';
import * as BooksActionsTypes from './store/book/books.actions';
import * as BorrowActionsTypes from './store/borrow/borrow.actions';
import * as UserActionsTypes from './store/user/users.actions';

import { MatPaginatorModule } from '@angular/material/paginator';
import { TranslatePipe, TranslateDirective } from '@ngx-translate/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    SigninComponent,
    RouterModule,
    UserModule,
    MatPaginatorModule,
    TranslatePipe,
    TranslateDirective,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'books-library';

  constructor(
    private store: Store<{ appState: AppStateShape }>,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.store.dispatch(BooksActionsTypes.init());
    this.authService.getAuthListener().subscribe((user) => {
      if (user) {
        this.store.dispatch(BorrowActionsTypes.init());
        if (user?.admin) {
          this.store.dispatch(UserActionsTypes.init());
        }
      }
    });
  }
}
