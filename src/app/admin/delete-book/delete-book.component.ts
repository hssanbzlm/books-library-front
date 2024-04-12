import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IBook } from '../../interfaces/IBook';
import { AppStateShape } from '../../store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-delete-book',

  templateUrl: './delete-book.component.html',
  styleUrl: './delete-book.component.css',
})
export class DeleteBookComponent {
  deleting = false;
  confirmDelete = false;
  error: null | string = null;
  @Input() book!: IBook;
  @Output() delete = new EventEmitter();
  books$ = this.store.select(({ appState }) => appState.books);
  constructor(private store: Store<{ appState: AppStateShape }>) {}
  ngOnInit(): void {
    this.books$.subscribe((booksState) => {
      this.deleting = booksState.loading;
      this.error = booksState.error;
      if (!this.deleting && !this.error && this.confirmDelete)
        this.delete.emit();
    });
  }

  onDelete() {
    this.confirmDelete = true;
    this.store.dispatch({ type: '[Book] Remove', payload: this.book.id });
  }
}
