import { Component } from '@angular/core';
import { IUser } from '../../interfaces/IUser';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent {
  columns = [
    { column: 'name', dataKey: 'name' },
    { column: 'Last name', dataKey: 'lastName' },
    { column: 'email', dataKey: 'email' },
    { column: 'active', dataKey: 'active' },
  ];
  data!: Partial<IUser>[];

  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.data = this.userService.getUsers();
  }
  onUserAdd() {
    //open modal to add a new user
    console.log('add user');
  }
  onUserEdit(user: IUser) {
    // open modal to edit user
    console.log('user', user);
  }
}
