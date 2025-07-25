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
export interface IBookCategoriesDropdown {
  value: Category;
  viewValue: string;
}
export interface IBook {
  id: number;
  title: string;
  numberOfPages: number;
  edition: string;
  year: number;
  category: Category;
  quantity: number;
  coverPath: string;
  synopsis: string;
  authors: string[];
}
export type createBookDto = Omit<IBook, 'id' | 'coverPath'>;
export type updateBookDto = Omit<IBook, 'id'>;
export interface IBorrowDetails {
  idBook: number;
  startDate: string;
  endDate: string;
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
  createdDate: string;
  receiverRole: 'admin' | 'user';
  receiverSeen: boolean;
}
export type Status =
  | 'Pending'
  | 'Checkedout'
  | 'Refused'
  | 'Accepted'
  | 'Damaged'
  | 'Lost'
  | 'Returned'
  | 'Overdue'
  | 'Canceled';
type EditableStatus =
  | 'Pending'
  | 'Checkedout'
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
export interface INotification {
  id:number;
  receiver:IUser;
  sender:IUser;
  message:string;
  date:Date;
  receiverSeen:boolean;
}
export type LanguageDirection = 'rtl' | 'ltr';
export type Visibility = 'always' | 'connected' | 'guest'
export interface INavItem {
  path:string,
  title:string,
  visibility:Visibility
}
