import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  navItems = [
    { title: 'Dashboard', path: '' },
    { title: 'Borrow', path: '' },
    { title: 'Books', path: '' },
    { title: 'Users', path: '' },
  ];
}
