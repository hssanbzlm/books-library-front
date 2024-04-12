import { Component, EventEmitter, Output } from '@angular/core';
import { Category } from '../../interfaces/IBook';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppStateShape } from '../../store';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css',
})
export class AddBookComponent {
  adding = false;
  error: null | string = null;
  confirmAdd = false;
  bookState$ = this.store.select(({ appState }) => appState.books);
  @Output() bookAdd = new EventEmitter();
  bookForm!: FormGroup;
  coverImg!: File;
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
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      numberOfPages: ['', [Validators.required]],
      edition: [''],
      year: ['', [Validators.required]],
      category: ['N/A'],
      quantity: ['', [Validators.required, Validators.min(1)]],
      coverPath: ['', [Validators.required]],
      authors: ['', Validators.required],
    });
    this.bookState$.subscribe((bookState) => {
      this.adding = bookState.loading;
      this.error = bookState.error;
      if (!this.adding && !this.error && this.confirmAdd) this.bookAdd.emit();
    });
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      this.coverImg = event.target.files[0];
    }
  }

  addBook() {
    if (this.bookForm.valid) {
      this.confirmAdd = true;
      const formData = new FormData();
      formData.append('title', this.bookForm.get('title')!.value);
      formData.append(
        'numberOfPages',
        this.bookForm.get('numberOfPages')!.value
      );
      formData.append('edition', this.bookForm.get('edition')?.value);
      formData.append('year', this.bookForm.get('year')!.value);
      formData.append('category', this.bookForm.get('category')!.value);
      formData.append('quantity', this.bookForm.get('quantity')!.value);
      formData.append('authors[]', this.bookForm.get('authors')!.value);
      formData.append('cover', this.coverImg);
      this.store.dispatch({ type: '[Book] Add', book: formData });
    }
  }
}
