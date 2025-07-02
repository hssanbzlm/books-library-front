import { Component } from '@angular/core';
import { INavItem } from '@src/common/types';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  navItems:INavItem[] = [
    { title: 'Connect', path: '/auth', visibility: 'guest' },
    { title: 'Books', path: 'books',visibility:"always" },
    { title: 'Borrow', path: './borrow-list',visibility:"connected" },
  ];
}
