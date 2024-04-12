import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Category, IBook } from '../../interfaces/IBook';
import { AppStateShape } from '../../store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrl: './update-book.component.css',
})
export class UpdateBookComponent {
  updating = false;
  @Input() book!: IBook;
  updatingBook!: IBook;
  @Output() bookUpdate = new EventEmitter();
  bookForm!: FormGroup;
  categories: Category[] = [
    'Horror',
    'Thriller',
    'Science fiction',
    'Fantasy',
    'Adventure',
    'Romance',
    'History',
    'Psychology',
    'Biography',
    'Sport',
    'Science',
    'N/A',
  ];
  constructor(
    private fb: FormBuilder,
    private store: Store<{ appState: AppStateShape }>
  ) {}
  ngOnInit(): void {
    this.updatingBook = { ...this.book };
    this.bookForm = this.fb.group({
      title: [this.updatingBook.title, Validators.required],
      numberOfPages: [this.updatingBook.numberOfPages, [Validators.required]],
      edition: [this.updatingBook.edition],
      year: [this.updatingBook.year, [Validators.required]],
      category: [this.updatingBook.category],
      quantity: [
        this.updatingBook.quantity,
        [Validators.required, Validators.min(1)],
      ],
      coverPath: ['', [Validators.required]],
      authors: [this.updatingBook.authors, Validators.required],
    });
  }

  updateBook() {
    if (this.bookForm.valid) {
      this.updating = true;
      console.log(this.bookForm.value);
      setTimeout(() => {
        this.bookUpdate.emit();
      }, 5000);
    } else {
    }
  }
}
