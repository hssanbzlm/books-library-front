export interface IBorrow {
  userToBookId: number;
  status: Status;
  userId: number;
  userName: string;
  userLastName: string;
  email: string;
  bookId: number;
  bookTitle: string;
  endDate: string;
  startDate: string;
}
export type Status =
  | 'Pending'
  | 'Checked-out'
  | 'Refused'
  | 'Accepted'
  | 'Damaged'
  | 'Lost'
  | 'Returned'
  | 'Overdue'
  | 'Canceled';
