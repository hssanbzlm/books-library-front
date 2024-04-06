import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/IUser';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: Partial<IUser>[] = [
    {
      name: 'Hssan',
      lastName: 'Bouzlima',
      email: 'hassanbouzlima@gmail.com',
      active: true,
    },
    {
      name: 'Boouali',
      lastName: 'Lahwar',
      email: 'bhsan@gmail.com',
      active: false,
    },
  ];

  constructor() {}

  getUsers() {
    return this.users;
  }
}
