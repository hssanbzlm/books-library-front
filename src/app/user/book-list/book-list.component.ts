import { Component } from '@angular/core';
import { BookService } from '../../services/book.service';
import { IBook } from '../../interfaces/IBook';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
})
export class BookListComponent {
  books: IBook[] = [];
  constructor(private bookService: BookService) {}
  ngOnInit(): void {
    this.books = this.bookService.getBooks();
  }
}
