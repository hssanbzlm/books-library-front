import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppStateShape } from '../../store';
import * as UsersActionsTypes from '../../store/user/users.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  title: string;
  $routeChange: Subscription = new Subscription();
  navItems = [
    { title: 'Dashboard', path: '/admin' },
    { title: 'Borrow', path: './borrow-list' },
    { title: 'Books', path: './book-list' },
    { title: 'Users', path: './user-list' },
  ];
  constructor(
    private router: Router,
    private store: Store<{ appState: AppStateShape }>
  ) {
    this.store.dispatch(UsersActionsTypes.init());
    this.title = this.getCurrentTitle(this.router.url);
  }
  ngOnInit(): void {
    this.$routeChange = this.router.events.subscribe((v) => {
      if (v instanceof NavigationEnd) {
        this.title = this.getCurrentTitle(v.url);
      }
    });
  }

  private getCurrentTitle(url: String): string {
    const currentPath = url.slice(url.lastIndexOf('/') + 1);
    return this.navItems.find((v) => v.path.includes(currentPath))!.title;
  }

  ngOnDestroy(): void {
    this.$routeChange.unsubscribe();
  }
}
