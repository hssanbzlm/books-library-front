import { Component, EventEmitter, Output } from '@angular/core';
import { Category } from '../../interfaces/IBook';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css',
})
export class AddBookComponent {
  adding = false;
  @Output() bookAdd = new EventEmitter();
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
  constructor(private fb: FormBuilder) {}
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
  }

  addBook() {
    if (this.bookForm.valid) {
      this.adding = true;
      console.log(this.bookForm.value);
      setTimeout(() => {
        this.bookAdd.emit();
      }, 5000);
    } else {
    }
  }
}
