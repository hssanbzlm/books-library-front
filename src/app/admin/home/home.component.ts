import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { AppStateShape } from '../../store';
import * as UsersActionsTypes from '../../store/user/users.actions';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  title: string;
  $routeChange: Subscription = new Subscription();
  $destroy = new Subject();
  pageDirection!: 'rtl' | 'ltr';
  navItems = [
    { title: 'Dashboard', path: '/admin' },
    { title: 'Borrow', path: './borrow-list' },
    { title: 'Books', path: './book-list' },
    { title: 'Users', path: './user-list' },
  ];
  constructor(
    private router: Router,
    private store: Store<{ appState: AppStateShape }>,
    private translate: TranslateService
  ) {
    this.store.dispatch(UsersActionsTypes.init());
    this.title = this.getCurrentTitle(this.router.url);
  }
  ngOnInit(): void {
    if (this.translate.currentLang == 'ar') this.pageDirection = 'rtl';
    else this.pageDirection = 'ltr';
    this.translate.onLangChange
      .pipe(takeUntil(this.$destroy))
      .subscribe((languageEvent: LangChangeEvent) => {
        if (languageEvent.lang == 'ar') this.pageDirection = 'rtl';
        else this.pageDirection = 'ltr';
      });
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
    this.$destroy.next(true);
    this.$routeChange.unsubscribe();
  }
}
