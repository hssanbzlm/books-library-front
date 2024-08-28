import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userToBookUrl } from '../../API/api';

@Injectable({
  providedIn: 'root',
})
export class UserToBookService {
  constructor(private http: HttpClient) {}

  borrowList() {
    return this.http.get(`${userToBookUrl}`, { withCredentials: true });
  }

  borrow(idBook: number, startDate: string, endDate: string) {
    return this.http.post<HttpResponse<any>>(
      `${userToBookUrl}/borrow`,
      { idBook, startDate, endDate },
      { withCredentials: true }
    );
  }
}
