import { IBook } from './IBook';
import { IUser } from './IUser';

export interface IBorrow {
  user: Omit<IUser, 'admin' | 'active'>;
  book: Omit<
    IBook,
    | 'numberOfPages'
    | 'edition'
    | 'year'
    | 'category'
    | 'quantity'
    | 'coverPath'
    | 'authors'
  >;
  startDate: string;
  endDate: string;
  status:
    | 'Pending'
    | 'Checked-out'
    | 'Refused'
    | 'Accepted'
    | 'Damaged'
    | 'Lost'
    | 'Returned'
    | 'Overdue';
}
