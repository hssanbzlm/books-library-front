import { Injectable } from '@angular/core';
import { IBook } from '@src/common/types';
import { HttpClient } from '@angular/common/http';
import { booksUrl } from '@api/api';

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

  updateBook(id: number, book: FormData) {
    return this.http.patch<IBook>(`${booksUrl}/${id}`, book, {
      withCredentials: true,
    });
  }
  removeBook(id: number) {
    return this.http.delete(`${booksUrl}/${id}`, { withCredentials: true });
  }
}
