import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { authUrl } from '@api/api';
import { IUser } from '@src/common/types';
import { BehaviorSubject, catchError, map, of, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private $user: BehaviorSubject<IUser | null> =
    new BehaviorSubject<IUser | null>(null);
  constructor(private http: HttpClient) {}

  fetchWhoAmi() {
    return this.whoami().pipe(
      take(1),
      map((data) => {
        this.$user.next(data);
      }),
      catchError(() => {
        this.$user.next(null);
        return of('error');
      })
    );
  }

  signin(email: string, password: string) {
    return this.http.post<IUser>(
      `${authUrl}/signin`,
      { email, password },
      { withCredentials: true }
    );
  }

  signout() {
    return this.http.post(`${authUrl}/signout`, {}, { withCredentials: true });
  }

  whoami() {
    return this.http.get<IUser>(`${authUrl}/whoami`, { withCredentials: true });
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
}
