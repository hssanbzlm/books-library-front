import { Component, EventEmitter, Output } from '@angular/core';
import { IUser } from '../../interfaces/IUser';
import { UsersStateShape } from '../../store/user/users.reducer';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { AppStateShape } from '../../store';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css',
})
export class AddUserComponent {
  newUser: Partial<IUser> = { name: '', lastName: '', email: '' };
  adding = false;
  error: null | string = null;
  confirmAdding = false;
  users$ = this.store.select(({ appState }) => appState.users);
  @Output() userAdd = new EventEmitter();
  constructor(private store: Store<{ appState: AppStateShape }>) {}
  ngOnInit(): void {
    this.users$.subscribe((userState) => {
      this.adding = userState.loading;
      this.error = userState.error;
      if (this.confirmAdding && !this.adding && !this.error) {
        this.userAdd.emit();
      }
    });
  }
  addUser() {
    this.confirmAdding = true;
    this.store.dispatch({ type: '[User] Add', user: { ...this.newUser } });
  }
}
