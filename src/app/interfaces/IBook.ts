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
  quantiy: number;
  coverPath: string;
  authors: string[];
}
