import { Component, EventEmitter, Output } from '@angular/core';
import { IUser } from '@src/common/types';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { AppStateShape } from '@src/store';

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
  private destroy$ = new Subject();
  @Output() userAdd = new EventEmitter();
  constructor(private store: Store<{ appState: AppStateShape }>) {}
  ngOnInit(): void {
    this.users$.pipe(takeUntil(this.destroy$)).subscribe((userState) => {
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
  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
