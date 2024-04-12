import { Component } from '@angular/core';
import { IUser } from '../../interfaces/IUser';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as UsersActionsTypes from '../../store/user/users.actions';
import { UsersStateShape } from '../../store/user/users.reducer';
import { AppStateShape } from '../../store';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent {
  showUpdateModal = false;
  showAddModal = false;
  showDeleteModal = false;
  updateUser!: IUser;
  deleteUser!: IUser;
  columns = [
    { column: 'name', dataKey: 'name' },
    { column: 'Last name', dataKey: 'lastName' },
    { column: 'email', dataKey: 'email' },
    { column: 'active', dataKey: 'active' },
  ];
  users$: Observable<IUser[]> = this.store.select(
    ({ appState }) => appState.users.userList
  );
  constructor(private store: Store<{ appState: AppStateShape }>) {}
  ngOnInit(): void {
    this.store.dispatch(UsersActionsTypes.init());
  }
  onUserAdd() {
    this.toggleAddModal();
  }
  onUserEdit(user: IUser) {
    this.toggleUpdateModal();
    this.updateUser = user;
  }
  onUserDelete(user: IUser) {
    this.toggleDeleteModal();
    this.deleteUser = user;
  }
  handleUpdateUser() {
    this.toggleUpdateModal();
  }
  handleAddUser() {
    this.toggleAddModal();
  }
  handleDeleteUser() {
    this.toggleDeleteModal();
  }

  toggleUpdateModal() {
    this.showUpdateModal = !this.showUpdateModal;
  }
  toggleAddModal() {
    this.showAddModal = !this.showAddModal;
  }
  toggleDeleteModal() {
    this.showDeleteModal = !this.showDeleteModal;
  }
}
