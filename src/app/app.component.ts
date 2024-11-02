import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserModule } from './user/user.module';
import { SigninComponent } from './shared/signin/signin.component';
import { AppStateShape } from './store';
import { Store } from '@ngrx/store';
import * as BooksActionsTypes from './store/book/books.actions';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SigninComponent, RouterModule, UserModule, MatPaginatorModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'books-library';

  constructor(private store: Store<{ appState: AppStateShape }>) {}
  ngOnInit(): void {
    this.store.dispatch(BooksActionsTypes.init());
  }
}
