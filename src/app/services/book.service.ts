import { Injectable } from '@angular/core';
import { IBook } from '../interfaces/IBook';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private books: IBook[] = [
    {
      id: 1,
      numberOfPages: 50,
      title: 'Homo Sapiens',
      edition: 'first edition',
      authors: ['Hssan Boulzima'],
      coverPath: 'https://placehold.co/600x400',
      category: 'Adventure',
      quantity: 50,
      year: 2003,
    },
    {
      id: 2,
      numberOfPages: 257,
      title: 'L histoire de la tunisie',
      edition: 'Sud edition',
      authors: ['Elsa godart'],
      coverPath: 'https://placehold.co/700x700',
      category: 'Psychology',
      quantity: 10,
      year: 2008,
    },
    {
      id: 3,
      numberOfPages: 257,
      title: 'Les fainéants dans la vallée ferticle',
      edition: 'Sud edition',
      authors: ['Elsa godart'],
      coverPath: 'https://placehold.co/700x700',
      category: 'Psychology',
      quantity: 10,
      year: 2008,
    },
    {
      id: 4,
      numberOfPages: 357,
      title: 'Ce qui depend de moi',
      edition: 'Sud edition',
      authors: ['Elsa godart'],
      coverPath: 'https://placehold.co/700x1000',
      category: 'Psychology',
      quantity: 10,
      year: 2008,
    },
    {
      id: 5,
      numberOfPages: 657,
      title: 'Vivez plus riche vive les radins',
      edition: 'Sud edition',
      authors: ['Elsa godart'],
      coverPath: 'https://placehold.co/700x700',
      category: 'Fantasy',
      quantity: 10,
      year: 2008,
    },
  ];

  constructor() {}

  getBooks(): IBook[] {
    return this.books;
  }
}
