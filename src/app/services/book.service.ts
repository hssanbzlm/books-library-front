import { Injectable } from '@angular/core';
import { createBookDto, IBook } from '@src/common/types';
import { Apollo, gql } from 'apollo-angular';
import { updateBookDto } from '../common/types';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private readonly apollo: Apollo) {}

  getBooks() {
    return this.apollo.query<{ books: IBook[] }>({
      query: gql`
        {
          books {
            id
            title
            synopsis
            authors
            numberOfPages
            coverPath
            year
            category
            quantity
            edition
          }
        }
      `,
    });
  }

  addBook(book: createBookDto, cover: File) {
    const ADDBOOK = gql`
      mutation addBook($book: BookInput!, $cover: Upload!) {
        addBook(book: $book, cover: $cover) {
          id
          title
          coverPath
          synopsis
          authors
          numberOfPages
          quantity
          category
          year
          edition
        }
      }
    `;
    return this.apollo.mutate<{ addBook: IBook }>({
      mutation: ADDBOOK,
      variables: { book, cover },
      context: {
        useMultipart: true,
      },
    });
  }

  updateBook(id: number, book: updateBookDto, cover: File) {
    const UPDATEBOOK = gql`
      mutation updateBook($id: ID!, $book:UpdateBookInput!, $cover: Upload) {
        updateBook(id: $id, cover: $cover, book: $book) {
          id
          title
          coverPath
          synopsis
          authors
          numberOfPages
          quantity
          category
          year
          edition
        }
      }
    `;

    return this.apollo.mutate<{ updateBook: IBook }>({
      mutation: UPDATEBOOK,
      variables: { id, book, cover },
      context: {
        useMultipart: true,
      },
    });
  }
  removeBook(id: number) {
    const REMOVEBOOk = gql`
      mutation removeBook($id: String!) {
        removeBook(id: $id) {
          affected
        }
      }
    `;
    return this.apollo.mutate({ mutation: REMOVEBOOk, variables: { id } });
  }
  recommendBooks(text: string) {
    return this.apollo.query<{ recommend: { role: string; content: string } }>({
      query: gql`
        query Recommend($text: String!) {
          recommend(text: $text) {
            content
            role
          }
        }
      `,
      variables: {
        text,
      },
    });
  }
}
