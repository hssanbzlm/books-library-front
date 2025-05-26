import { Injectable } from '@angular/core';
import { IBook } from '@src/common/types';
import { HttpClient, HttpParams } from '@angular/common/http';
import { booksUrl,recommendBooks } from '@api/api';
import { Observable } from 'rxjs';

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
  recommendBooks(text:string){
    const params= new HttpParams().set('text',text)
    return this.http.get<{role:string,content:string}>(recommendBooks,{params})
  }
}
