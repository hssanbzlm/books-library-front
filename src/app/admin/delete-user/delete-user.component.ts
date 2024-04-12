import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '../../interfaces/IUser';
import { Store } from '@ngrx/store';
import { UsersStateShape } from '../../store/user/users.reducer';
import * as UsersActionsTypes from '../../store/user/users.actions';
import { AppStateShape } from '../../store';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrl: './delete-user.component.css',
})
export class DeleteUserComponent {
  users$ = this.store.select(({ appState }) => appState.users);
  waiting = false;
  error!: string | null;
  confirmDelete = false;

  @Input() user!: IUser;
  @Output() delete = new EventEmitter();

  constructor(private store: Store<{ appState: AppStateShape }>) {}
  ngOnInit(): void {
    this.users$.subscribe((userState) => {
      this.waiting = userState.loading;
      this.error = userState.error;
      if (!userState.error && !userState.loading && this.confirmDelete)
        this.delete.emit();
    });
  }

  onDelete() {
    this.store.dispatch(UsersActionsTypes.remove({ payload: this.user.id }));
    this.confirmDelete = true;
  }
}
