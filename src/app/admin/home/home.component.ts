import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { INavItem, LanguageDirection } from '@src/common/types';
import { TranslateFacadeService } from '@src/services/translate-facade.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  title: string;
  $routeChange: Subscription = new Subscription();
  $destroy = new Subject();
  pageDirection!: LanguageDirection;
  navItems:INavItem[] = [
    { title: 'Dashboard', path: '/admin',visibility:'connected' },
    { title: 'Borrow', path: './borrow-list',visibility:'connected' },
    { title: 'Books', path: './book-list',visibility:'connected' },
    { title: 'Users', path: './user-list',visibility:'connected' },
  ];
  constructor(
    private router: Router,
    private translate: TranslateFacadeService
  ) {
    this.title = this.getCurrentTitle(this.router.url);
  }
  ngOnInit(): void {
    this.translate
      .getPageDirection()
      .pipe(takeUntil(this.$destroy))
      .subscribe((pageDirection) => {
        this.pageDirection = pageDirection;
      });

    this.$routeChange = this.router.events.subscribe((routerEvent) => {
      if (routerEvent instanceof NavigationEnd) {
        this.title = this.getCurrentTitle(routerEvent.url);
      }
    });
  }

  private getCurrentTitle(url: String): string {
    const currentPath = url.slice(url.lastIndexOf('/') + 1);
    return this.navItems.find((navItem) => navItem.path.includes(currentPath))!
      .title;
  }
  setDirectionClass() {
    return this.translate.getDirectionClass();
  }

  ngOnDestroy(): void {
    this.$destroy.next(true);
    this.$routeChange.unsubscribe();
  }
}
