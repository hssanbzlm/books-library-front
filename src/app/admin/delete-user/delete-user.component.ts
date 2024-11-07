import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '@src/common/types';
import { Store } from '@ngrx/store';
import * as UsersActionsTypes from '@src/store/user/users.actions';
import { AppStateShape } from '@src/store';
import { Subject, takeUntil } from 'rxjs';

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
  private destroy$ = new Subject();

  constructor(private store: Store<{ appState: AppStateShape }>) {}
  ngOnInit(): void {
    this.users$.pipe(takeUntil(this.destroy$)).subscribe((userState) => {
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
  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
