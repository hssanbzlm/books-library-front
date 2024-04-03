import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  navItems = [
    { title: 'Dashboard', path: '/admin' },
    { title: 'Borrow', path: './borrow-list' },
    { title: 'Books', path: './book-list' },
    { title: 'Users', path: './user-list' },
  ];
}
