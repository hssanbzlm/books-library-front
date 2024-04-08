import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '../../interfaces/IUser';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css',
})
export class UpdateUserComponent {
  @Input() user!: Partial<IUser>;
  newUserValue!: Partial<IUser>;
  @Output() userUpdate = new EventEmitter();
  waiting = false;
  constructor() {}

  ngOnInit(): void {
    this.newUserValue = { ...this.user };
  }

  updateUser() {
    // http call to update user then:
    this.waiting = true;
    setTimeout(() => {
      this.waiting = false;
      this.userUpdate.emit();
    }, 5000);
  }
}
