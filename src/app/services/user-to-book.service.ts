import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userToBookUrl } from '../../API/api';
import { IBorrow } from '../interfaces/IBorrow';
import { map, mergeMap } from 'rxjs';
import { format } from 'date-fns';

@Injectable({
  providedIn: 'root',
})
export class UserToBookService {
  constructor(private http: HttpClient) {}

  borrowList() {
    return this.http
      .get<IBorrow[]>(`${userToBookUrl}`, {
        withCredentials: true,
      })
      .pipe(
        map((value) => {
          return value.map((borrowItem) => ({
            ...borrowItem,
            endDate: format(borrowItem.endDate, 'dd-MM-yyyy'),
            startDate: format(borrowItem.startDate, 'dd-MM-yyyy'),
            userId: borrowItem.user.id,
            userName: borrowItem.user.name,
            userLastName: borrowItem.user.lastName,
            email: borrowItem.user.email,
            bookId: borrowItem.book.id,
            bookTitle: borrowItem.book.title,
          }));
        })
      );
  }

  borrow(idBook: number, startDate: string, endDate: string) {
    return this.http.post<HttpResponse<any>>(
      `${userToBookUrl}/borrow`,
      { idBook, startDate, endDate },
      { withCredentials: true }
    );
  }
}
