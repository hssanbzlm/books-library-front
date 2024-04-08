import { Component } from '@angular/core';
import { IUser } from '../../interfaces/IUser';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent {
  showUpdateModal = false;
  showAddModal = false;
  updateUser!: IUser;
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
    this.toggleAddModal();
  }
  onUserEdit(user: IUser) {
    this.toggleUpdateModal();
    this.updateUser = user;
  }
  handleUpdateUser() {
    this.toggleUpdateModal();
  }
  handleAddUser() {
    this.toggleAddModal();
  }

  toggleUpdateModal() {
    this.showUpdateModal = !this.showUpdateModal;
  }
  toggleAddModal() {
    this.showAddModal = !this.showAddModal;
  }
}
