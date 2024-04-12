import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '../../interfaces/IUser';
import { UsersStateShape } from '../../store/user/users.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css',
})
export class UpdateUserComponent {
  @Input() user!: Partial<IUser>;
  newUserValue!: Partial<IUser>;
  @Output() userUpdate = new EventEmitter();
  users$ = this.store.select((state) => state.users);
  confirmUpdate = false;
  waiting = false;
  error: null | string = null;

  constructor(private store: Store<{ users: UsersStateShape }>) {}

  ngOnInit(): void {
    this.newUserValue = { ...this.user };
    this.users$.subscribe((userState) => {
      this.waiting = userState.loading;
      this.error = userState.error;
      if (this.confirmUpdate && !this.waiting && !this.error) {
        this.userUpdate.emit();
      }
    });
  }

  updateUser() {
    this.confirmUpdate = true;
    this.store.dispatch({
      type: '[User] Update activity',
      payload: { userId: this.user.id, activity: this.newUserValue.active },
    });
  }
}
