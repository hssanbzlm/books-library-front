import { Component } from '@angular/core';
import { BookService } from '../../services/book.service';
import { IBook } from '../../interfaces/IBook';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
})
export class BookListComponent {
  showAddModal = false;
  showUpdateModal = false;
  showDeleteModal = false;
  updatingBook!: IBook;
  deletingBook!: IBook;
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
    this.toggleAddModal();
  }
  onEditBook(book: IBook) {
    this.updatingBook = book;
    this.toggleUpdateModal();
  }

  onDeleteBook(book: IBook) {
    this.deletingBook = book;
    this.toggleDeleteModal();
  }
  handleAddBook() {
    this.toggleAddModal();
  }
  handleUpdateBook() {
    this.toggleUpdateModal();
  }
  handleDeleteBook() {
    this.toggleDeleteModal();
  }

  toggleAddModal() {
    this.showAddModal = !this.showAddModal;
  }
  toggleUpdateModal() {
    this.showUpdateModal = !this.showUpdateModal;
  }

  toggleDeleteModal() {
    this.showDeleteModal = !this.showDeleteModal;
  }
}
