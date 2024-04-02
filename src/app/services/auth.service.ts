import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { signinUrl } from '../../API/api';
import { IUser } from '../interfaces/IUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signin(email: string, password: string) {
    return this.http.post<IUser>(signinUrl, { email, password });
  }
}
