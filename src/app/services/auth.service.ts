import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { authUrl } from '@api/api';
import { IUser } from '@src/common/types';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, catchError, map, of, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private $user: BehaviorSubject<IUser | null> =
    new BehaviorSubject<IUser | null>(null);
  private redirectUrl = '';
  constructor(private readonly apollo: Apollo) {}

  fetchWhoAmi() {
    return this.whoami().pipe(
      take(1),
      map(({ data }) => {
        this.$user.next(data.whoami);
      }),
      catchError(() => {
        this.$user.next(null);
        return of('error');
      })
    );
  }

  signin(email: string, password: string) {
    const SIGNIN = gql`
      mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          email
          name
          lastName
          admin
          active
        }
      }
    `;
    return this.apollo.mutate<{ login: IUser }>({
      mutation: SIGNIN,
      variables: { email, password },
    });
  }

  signout() {
    const SIGNOUT = gql`
      mutation logout {
        logout
      }
    `;
    return this.apollo.mutate({ mutation: SIGNOUT });
  }

  whoami() {
    return this.apollo.query<{ whoami: IUser }>({
      query: gql`
        {
          whoami {
            active
            admin
            name
            lastName
            email
            id
          }
        }
      `,
    });
  }
  getAuthUser() {
    return this.$user.value;
  }
  setAuthUser(user: IUser | null) {
    this.$user.next(user);
  }

  getAuthListener() {
    return this.$user;
  }
  setRedirectUrl(url: string) {
    this.redirectUrl = url;
  }
  getRedirectUrl() {
    return this.redirectUrl;
  }
}
