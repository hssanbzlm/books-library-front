import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Category, IBook, LanguageDirection } from '@src/common/types';
import { AppStateShape } from '@src/store';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { TranslateFacadeService } from '@src/services/translate-facade.service';

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
  private destroy$ = new Subject();

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
  pageDirection!: LanguageDirection;
  constructor(
    private fb: FormBuilder,
    private store: Store<{ appState: AppStateShape }>,
    private translate: TranslateFacadeService
  ) {}
  ngOnInit(): void {
    this.translate
      .getPageDirection()
      .pipe(takeUntil(this.destroy$))
      .subscribe((pageDirection) => {
        this.pageDirection = pageDirection;
      });
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

    this.bookState$.pipe(takeUntil(this.destroy$)).subscribe((bookState) => {
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
  removeAuthor(index: number): void {
    const authors = this.bookForm.get('authors') as FormArray;
    authors.removeAt(index);
  }
  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      this.previewNewCoverImg = URL.createObjectURL(event.target.files[0]);
      this.newCoverImg = event.target.files[0];
    }
  }
  setDirectionClass() {
    return this.translate.getDirectionClass();
  }

  updateBook() {
    if (this.bookForm.valid) {
      this.confirmUpdate = true;
      const updateBookInput = {
        title: this.bookForm.get('title')!.value,
        numberOfPages: +this.bookForm.get('numberOfPages')!.value,
        edition: this.bookForm.get('edition')!.value,
        year: +this.bookForm.get('year')!.value,
        category: this.bookForm.get('category')!.value,
        quantity: +this.bookForm.get('quantity')!.value,
        authors: (
          this.bookForm.get('authors')!.value as { author: string }[]
        ).map(({ author }) => author),
      }
      this.store.dispatch({
        type: '[Book] Update',
        book: updateBookInput,
        id: this.book.id,
        cover:this.newCoverImg
      });
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
