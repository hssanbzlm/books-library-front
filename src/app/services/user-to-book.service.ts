import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  isBookReadyToBorrow,
  updateUserBorrow,
  cancelUserBorrow,
  userToBookUrl,
} from '@api/api';
import { IBorrow, Status } from '../common/types';
import { map } from 'rxjs';
import { format } from 'date-fns';

@Injectable({
  providedIn: 'root',
})
export class UserToBookService {
  constructor(private http: HttpClient) {}

  getStatusProperties(status: Status) {
    let possibleNextStatus: Status[] = [];
    switch (status) {
      case 'Pending':
        possibleNextStatus = ['Accepted', 'Refused'];
        break;
      case 'Accepted':
        possibleNextStatus = ['Checked-out', 'Canceled'];
        break;
      case 'Checked-out':
        possibleNextStatus = ['Returned', 'Damaged', 'Lost', 'Overdue'];
        break;
      case 'Overdue':
        possibleNextStatus = ['Returned', 'Damaged', 'Lost'];
        break;
      case 'Lost':
        possibleNextStatus = ['Damaged', 'Returned'];
        break;
    }
    return possibleNextStatus;
  }

  borrowList() {
    return this.http
      .get<IBorrow[]>(`${userToBookUrl}`, {
        withCredentials: true,
      })
      .pipe(
        map((value) => {
          return value.map((borrowItem) => ({
            ...borrowItem,
            createdDate: format(borrowItem.createdDate, 'dd/MM/yyyy'),
            endDate: format(borrowItem.endDate, 'dd/MM/yyyy'),
            startDate: format(borrowItem.startDate, 'dd/MM/yyyy'),
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

  updateBorrow(borrowId: number, newStatus: string) {
    return this.http.patch(
      `${userToBookUrl}/borrow-status`,
      { borrowId, status: newStatus },
      { withCredentials: true }
    );
  }
  isReadyToBorrow(bookId: number) {
    return this.http.get(`${isBookReadyToBorrow}/${bookId}`, {
      withCredentials: true,
    });
  }

  updateUserBorrow(borrowId: number, startDate: string, endDate: string) {
    return this.http.put<IBorrow>(
      updateUserBorrow,
      { borrowId, startDate, endDate },
      { withCredentials: true }
    );
  }
  cancelUserBorrow(borrowId: number) {
    return this.http.put<IBorrow>(
      cancelUserBorrow,
      { borrowId },
      { withCredentials: true }
    );
  }
}
