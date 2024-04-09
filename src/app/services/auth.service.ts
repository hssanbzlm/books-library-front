import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { signinUrl, signoutUrl, whoamiUrl } from '../../API/api';
import { IUser } from '../interfaces/IUser';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private $user: BehaviorSubject<IUser | null> =
    new BehaviorSubject<IUser | null>(null);
  constructor(private http: HttpClient) {
    this.whoami().subscribe({
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
      signinUrl,
      { email, password },
      { withCredentials: true }
    );
  }

  signout() {
    return this.http.post(signoutUrl, {}, { withCredentials: true });
  }

  whoami() {
    return this.http.get<IUser>(whoamiUrl, { withCredentials: true });
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
