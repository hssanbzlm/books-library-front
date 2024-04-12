import { Injectable } from '@angular/core';
import { IBook } from '../interfaces/IBook';
import { HttpClient } from '@angular/common/http';
import { booksUrl } from '../../API/api';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient) {}

  getBooks() {
    return this.http.get<IBook[]>(booksUrl, { withCredentials: true });
  }

  addBook(book: FormData) {
    return this.http.post<IBook>(booksUrl, book, { withCredentials: true });
  }
}
