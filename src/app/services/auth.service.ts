import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { authUrl } from '@api/api';
import { IUser } from '../common/types';
import { BehaviorSubject, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private $user: BehaviorSubject<IUser | null> =
    new BehaviorSubject<IUser | null>(null);
  constructor(private http: HttpClient) {
    this.whoami()
      .pipe(take(1))
      .subscribe({
        next: (user) => {
          this.$user.next(user);
        },
        error: () => {
          this.$user?.next(null);
        },
      });
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
