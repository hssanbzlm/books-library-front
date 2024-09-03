import { Component } from '@angular/core';
import { AppStateShape } from '../../store';
import { Store } from '@ngrx/store';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
})
export class BookListComponent {
  books$ = this.store.select(({ appState }) => appState.books.bookList);
  loading$ = this.store.select(({ appState }) => appState.books.loading);
  error$ = this.store.select(({ appState }) => appState.books.error);
  constructor(private store: Store<{ appState: AppStateShape }>) {}
  ngOnInit(): void {}
  pageSize = 4;
  page = 0;

  handlePageEvent(e: PageEvent) {
    this.page = e.pageIndex;
    this.pageSize = e.pageSize;
  }
}
