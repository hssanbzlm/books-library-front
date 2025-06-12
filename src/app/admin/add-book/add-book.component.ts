import { Component, EventEmitter, Output } from '@angular/core';
import { Category } from '@src/common/types';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppStateShape } from '@src/store';
import { Subject, takeUntil } from 'rxjs';
import * as BooksActionsTypes from '../../store/book/books.actions';


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
  private destroy$ = new Subject();

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
      authors: this.fb.array([this.createAuthor()]),
      synopsis: ['', [Validators.required, Validators.minLength(15)]],
    });
    this.bookState$.pipe(takeUntil(this.destroy$)).subscribe((bookState) => {
      this.adding = bookState.loading;
      this.error = bookState.error;
      if (!this.adding && !this.error && this.confirmAdd) this.bookAdd.emit();
    });
  }

  get authorControls() {
    return (this.bookForm.get('authors') as FormArray).controls;
  }

  createAuthor(): FormGroup {
    return this.fb.group({
      author: ['', Validators.required],
    });
  }

  addAuthor(): void {
    const authors = this.bookForm.get('authors') as FormArray;
    authors.push(this.createAuthor());
  }
  removeAuthor(index: number): void {
    const authors = this.bookForm.get('authors') as FormArray;
    authors.removeAt(index);
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      this.coverImg = event.target.files[0];
    }
  }

  addBook() {
    if (this.bookForm.valid) {
      this.confirmAdd = true;
      const createBookInput = {
        title: this.bookForm.get('title')!.value,
        numberOfPages: +this.bookForm.get('numberOfPages')!.value,
        edition: this.bookForm.get('edition')!.value,
        year: +this.bookForm.get('year')!.value,
        category: this.bookForm.get('category')!.value,
        quantity: +this.bookForm.get('quantity')!.value,
        synopsis: this.bookForm.get('synopsis')!.value,
        authors: (
          this.bookForm.get('authors')!.value as { author: string }[]
        ).map(({ author }) => author),
      };

      this.store.dispatch(BooksActionsTypes.add({book:createBookInput,cover:this.coverImg}));
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
