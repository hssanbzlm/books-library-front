import { Component } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  navItems = [
    { title: 'Books', path: 'books' },
    { title: 'Borrow', path: './borrow-list' },
  ];
}
