import { Component } from '@angular/core';
import { AppStateShape } from '@src/store';
import { Store } from '@ngrx/store';
import { PageEvent } from '@angular/material/paginator';
import { IBook } from '@src/common/types';
import { Subject, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
})
export class BookListComponent {
  books$ = this.store.select(({ appState }) => appState.books.bookList);
  loading$ = this.store.select(({ appState }) => appState.books.loading);
  error$ = this.store.select(({ appState }) => appState.books.error);
  destroy$ = new Subject();
  filtredBooks: IBook[] = [];
  constructor(private store: Store<{ appState: AppStateShape }>) {}
  ngOnInit(): void {
    this.initBooks();
  }
  pageSize = 4;
  page = 0;
  pageSizeOptions = [4, 7, 10, 20, 25];
  searchedText = '';

  handlePageEvent(e: PageEvent) {
    this.page = e.pageIndex;
    this.pageSize = e.pageSize;
  }

  onSearch() {
    if (this.searchedText) {
      this.filtredBooks = this.filtredBooks.filter((book) => {
        return book.title
          .toLowerCase()
          .includes(this.searchedText.toLowerCase());
      });
    } else {
      this.initBooks();
    }
  }

  private initBooks() {
    this.books$.pipe(takeUntil(this.destroy$)).subscribe((books) => {
      this.filtredBooks = books;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
