import { Component } from '@angular/core';
import { AppStateShape } from '@src/store';
import { Store } from '@ngrx/store';
import { PageEvent } from '@angular/material/paginator';
import { IBook } from '@src/common/types';
import { Subject, takeUntil } from 'rxjs';
import { MatSelectChange } from '@angular/material/select';
import { categoriesDropdown } from '@src/common/helper';

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
  categories = categoriesDropdown;
  selectedCategory: string | undefined = undefined;
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
    this.onFilter();
  }
  onChangeCategory(e: MatSelectChange) {
    this.selectedCategory = e.value;
    this.onFilter();
  }
  onFilter() {
    this.initBooks();
    if (this.selectedCategory) {
      this.filterByCategories();
      if (this.searchedText) this.filterByTitle();
    } else {
      if (this.searchedText) {
        this.filterByTitle();
      }
    }
  }

  private initBooks() {
    this.books$.pipe(takeUntil(this.destroy$)).subscribe((books) => {
      this.filtredBooks = books;
    });
  }
  private filterByCategories() {
    this.filtredBooks = this.filtredBooks.filter((book) => {
      return book.category == this.selectedCategory;
    });
  }
  private filterByTitle() {
    this.filtredBooks = this.filtredBooks.filter((book) => {
      return book.title
        .toLowerCase()
        .includes(this.searchedText.toLocaleLowerCase());
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
