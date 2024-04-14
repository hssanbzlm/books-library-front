import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
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
  error: null | string = null;
  confirmUpdate = false;
  newCoverImg: File | null = null;
  previewNewCoverImg: string | null = null;
  bookState$ = this.store.select(({ appState }) => appState.books);
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
    const authorsArray = this.updatingBook.authors.map((author) =>
      this.createAuthor(author)
    );

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
      coverPath: [this.updatingBook.coverPath, [Validators.required]],
      authors: this.fb.array(authorsArray),
    });

    this.bookState$.subscribe((bookState) => {
      this.updating = bookState.loading;
      this.error = bookState.error;
      if (!this.updating && !this.error && this.confirmUpdate)
        this.bookUpdate.emit();
    });
  }
  get authorControls() {
    return (this.bookForm.get('authors') as FormArray).controls;
  }

  createAuthor(author: string = ''): FormGroup {
    return this.fb.group({
      author: [author, Validators.required],
    });
  }

  addAuthor(): void {
    const authors = this.bookForm.get('authors') as FormArray;
    authors.push(this.createAuthor());
  }
  removeAuthor(): void {
    const authors = this.bookForm.get('authors') as FormArray;
    authors.removeAt(authors.length - 1);
  }
  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      this.previewNewCoverImg = URL.createObjectURL(event.target.files[0]);
      this.newCoverImg = event.target.files[0];
    }
  }
  updateBook() {
    if (this.bookForm.valid) {
      this.confirmUpdate = true;
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
      for (let i = 0; i < this.bookForm.get('authors')!.value.length; i++) {
        formData.append(
          'authors[]',
          this.bookForm.get('authors')!.value[i].author
        );
      }
      if (this.newCoverImg) formData.append('cover', this.newCoverImg);
      this.store.dispatch({
        type: '[Book] Update',
        book: formData,
        id: this.book.id,
      });
    }
  }
}
