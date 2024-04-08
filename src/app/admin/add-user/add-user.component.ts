import { Component, EventEmitter, Output } from '@angular/core';
import { IUser } from '../../interfaces/IUser';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css',
})
export class AddUserComponent {
  newUser: Partial<IUser> = { name: '', lastName: '', email: '' };
  adding = false;
  @Output() userAdd = new EventEmitter();
  constructor() {}

  addUser() {
    this.adding = true;
    setTimeout(() => {
      this.adding = false;
      this.userAdd.emit();
    }, 5000);
  }
}
