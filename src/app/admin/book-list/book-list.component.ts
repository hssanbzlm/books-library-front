import { Component } from '@angular/core';
import { BookService } from '../../services/book.service';
import { IBook } from '../../interfaces/IBook';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
})
export class BookListComponent {
  columns = [
    { column: 'title', dataKey: 'title' },
    { column: 'category', dataKey: 'category' },
    { column: 'pages', dataKey: 'numberOfPages' },
    { column: 'quantity', dataKey: 'quantity' },
  ];
  data!: Partial<IBook>[];
  constructor(private bookService: BookService) {}
  ngOnInit(): void {
    this.data = this.bookService.getBooks();
  }
  onAddBook() {
    // open modal to add new book
    console.log('add book');
  }
  onEditBook(book: IBook) {
    // open modal to edit book
    console.log('book ', book);
  }
}
