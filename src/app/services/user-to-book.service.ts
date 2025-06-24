import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBorrow, Status } from '../common/types';
import { map } from 'rxjs';
import { format } from 'date-fns';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class UserToBookService {
  constructor(private http: HttpClient, private readonly apollo: Apollo) {}

  getStatusProperties(status: Status) {
    let possibleNextStatus: Status[] = [];
    switch (status) {
      case 'Pending':
        possibleNextStatus = ['Accepted', 'Refused'];
        break;
      case 'Accepted':
        possibleNextStatus = ['Checkedout', 'Canceled'];
        break;
      case 'Checkedout':
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
    return this.apollo
      .query<{ borrowList: IBorrow[] }>({
        query: gql`
          {
            borrowList {
              userToBookId
              createdDate
              endDate
              startDate
              bookId
              bookTitle
              status
              userId
              userName
              userLastName
              email
            }
          }
        `,
      })
      .pipe(
        map(({ data }) => {
          return data.borrowList.map((borrowItem) => ({
            ...borrowItem,
            createdDate: format(
              new Date(borrowItem.createdDate),
              'dd/MM/yyyy'
            ),
            endDate: format(new Date(borrowItem.endDate), 'dd/MM/yyyy'),
            startDate: format(new Date(borrowItem.startDate), 'dd/MM/yyyy'),
          }));
        })
      );
  }

  borrow(idBook: number, startDate: string, endDate: string) {
    const BORROW = gql`
      mutation borrow($borrowDetails: BorrowInput!) {
        borrow(borrowDetails: $borrowDetails) {
          title
          id
        }
      }
    `;
    return this.apollo.mutate({
      mutation: BORROW,
      variables: { borrowDetails: { idBook: +idBook, startDate, endDate } },
    });
  }

  updateBorrow(borrowId: number, newStatus: string) {
    const UPDATEBORROW = gql`
      mutation updateBorrow($borrowUpdate: UpdateBorrowInput!) {
        updateBorrow(borrowUpdate: $borrowUpdate) {
          userToBookId
          createdDate
          endDate
          startDate
          bookId
          bookTitle
          status
          userId
          userName
          userLastName
          email
        }
      }
    `;
    return this.apollo.mutate<{updateBorrow:IBorrow}>({
      mutation: UPDATEBORROW,
      variables: { borrowUpdate: { borrowId, status: newStatus } },
    });
  }
  isReadyToBorrow(bookId: number) {
    const ISREADYTOBORROW = gql`
      mutation isReadyToBorrow($bookId: ID!) {
        isReadyToBorrow(bookId: $bookId) {
          title
          id
        }
      }
    `;
    return this.apollo.mutate({
      mutation: ISREADYTOBORROW,
      variables: { bookId },
    });
  }

  updateUserBorrow(borrowId: number, startDate: string, endDate: string) {
    const UPDATEUSERBORROW = gql`
      mutation updateUserBorrow($borrowUpdate: UpdateUserBorrowInput!) {
        updateUserBorrow(borrowUpdate: $borrowUpdate) {
          userToBookId
          status
          userId
          userName
          userLastName
          email
          bookId
          bookTitle
          endDate
          startDate
          createdDate
        }
      }
    `;
    return this.apollo.mutate<{ updateUserBorrow: IBorrow }>({
      mutation: UPDATEUSERBORROW,
      variables: { borrowUpdate: { borrowId, startDate, endDate } },
    });
  }
  cancelUserBorrow(borrowId: number) {
    const CANCELUSERBORROW = gql`
      mutation cancelUserBorrow($borrowId: ID!) {
        cancelUserBorrow(borrowId: $borrowId) {
          userToBookId
          status
          userId
          userName
          userLastName
          email
          bookId
          bookTitle
          endDate
          startDate
          createdDate
        }
      }
    `;
    return this.apollo.mutate<{ cancelUserBorrow: IBorrow }>({
      mutation: CANCELUSERBORROW,
      variables: { borrowId },
    });
  }
}
