export type Category =
  | 'Horror'
  | 'Thriller'
  | 'Science fiction'
  | 'Fantasy'
  | 'Adventure'
  | 'Romance'
  | 'History'
  | 'Psychology'
  | 'Biography'
  | 'Sport'
  | 'Science'
  | 'N/A';
export interface IBook {
  id: number;
  title: string;
  numberOfPages: number;
  edition: string;
  year: number;
  category: Category;
  quantity: number;
  coverPath: string;
  authors: string[];
}
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
  receiverRole: 'admin' | 'user';
  receiverSeen: boolean;
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
type EditableStatus =
  | 'Pending'
  | 'Checked-out'
  | 'Accepted'
  | 'Lost'
  | 'Overdue';
export type NotAllowedEditStatus = Exclude<Status, EditableStatus>;
export interface IUser {
  id: number;
  email: string;
  name: string;
  lastName: string;
  admin: boolean;
  active: boolean;
}
export type LanguageDirection = 'rtl' | 'ltr';
