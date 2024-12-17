import { IBookCategoriesDropdown } from './types';

export function parseDate(dateStr: any) {
  const [day, month, year] = dateStr.split('-').map(Number);
  if (day && month && year) return new Date(year, month - 1, day); // Month is 0-indexed
  return null;
}
export function compare(a: any, b: any, isAsc: boolean) {
  const parseA = parseDate(a) ?? a;
  const parseB = parseDate(b) ?? b;
  return parseA < parseB ? -1 : 1 * (isAsc ? 1 : -1);
}
export const categoriesDropdown: IBookCategoriesDropdown[] = [
  { value: 'Horror', viewValue: 'Horror' },
  { value: 'Thriller', viewValue: 'Thriller' },
  { value: 'Science fiction', viewValue: 'Science fiction' },
  { value: 'Fantasy', viewValue: 'Fantasy' },
  { value: 'Adventure', viewValue: 'Adventure' },
  { value: 'Romance', viewValue: 'Romance' },
  { value: 'History', viewValue: 'History' },
  { value: 'Psychology', viewValue: 'Psychology' },
  { value: 'Biography', viewValue: 'Biography' },
  { value: 'Sport', viewValue: 'Sport' },
  { value: 'Science', viewValue: 'Science' },
  { value: 'N/A', viewValue: 'N/A' },
];
