import { Injectable } from '@angular/core';
import { IUser } from '@src/common/types';
import { HttpClient } from '@angular/common/http';
import { authUrl, usersUrl } from '@api/api';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  addUser(user: Partial<IUser>) {
    return this.http.post<IUser>(`${authUrl}/signup`, user, {
      withCredentials: true,
    });
  }
  getUsers() {
    return this.http.get<IUser[]>(usersUrl, { withCredentials: true });
  }
  removeUser(id: number) {
    return this.http.delete(`${usersUrl}/${id}`, { withCredentials: true });
  }
  updateUserActivity(id: number, userActivity: { active: boolean }) {
    return this.http.patch(`${usersUrl}/update-activity/${id}`, userActivity, {
      withCredentials: true,
    });
  }
}
