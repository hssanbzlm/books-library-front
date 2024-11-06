import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserModule } from './user/user.module';
import { SigninComponent } from './shared/signin/signin.component';
import { AppStateShape } from './store';
import { Store } from '@ngrx/store';
import * as BooksActionsTypes from './store/book/books.actions';
import { MatPaginatorModule } from '@angular/material/paginator';
import {
  TranslateService,
  TranslatePipe,
  TranslateDirective,
} from '@ngx-translate/core';

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
    private translate: TranslateService
  ) {}
  ngOnInit(): void {
    this.store.dispatch(BooksActionsTypes.init());
    this.translate.addLangs(['en', 'fr', 'ar']);
    this.translate.setDefaultLang('en');
    const language = localStorage.getItem('borrow-language');
    if (language) this.translate.use(language);
    else this.translate.use('en');
  }
}
