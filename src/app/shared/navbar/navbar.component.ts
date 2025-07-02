import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@src/services/auth.service';
import { INavItem, INotification, IUser, LanguageDirection, Visibility } from '@src/common/types';
import { fromEvent, Observable, Subject, take, takeUntil } from 'rxjs';
import { NotificationService } from '@src/services/notification.service';
import { IBorrow } from '@src/common/types';
import { MatBadgeModule } from '@angular/material/badge';
import { NotSeenNotifPipe } from '@src/pipes/not-seen-notif.pipe';
import { TranslatePipe } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { TranslateFacadeService } from '@src/services/translate-facade.service';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-navbar',
  imports: [
    CommonModule,
    RouterLink,
    MatBadgeModule,
    NotSeenNotifPipe,
    TranslatePipe,
    FormsModule,
    MatMenuModule,
  ],
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})

export class NavbarComponent {
  @Input() navItems: INavItem[] = [];
  userMenu: { title: string; action?: () => void }[] = [
    { title: 'Profile' },
    { title: 'Logout', action: () => this.logout() },
  ];
  show = false;
  showUserMenu = false;
  showUserNotification = false;
  isAuth!: IUser | null;
  notifications$ = new Observable<INotification[]>();
  languages = this.translate.getLanguages();
  currentLanguage!: { value: string; flag: string };
  currentFlag!: string;
  pageDirection!: LanguageDirection;

  private destroy$ = new Subject();

  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService,
    public translate: TranslateFacadeService
  ) {}
  ngOnInit(): void {
    this.translate.getCurrentLanguage().subscribe((currentLanguage) => {
      this.currentLanguage = currentLanguage;
    });
    this.translate.getPageDirection().subscribe((pageDirection) => {
      this.pageDirection = pageDirection;
    });
    this.notifications$ = this.notificationService.getNotificationsStream();
    this.authService
      .getAuthListener()
      .pipe(takeUntil(this.destroy$))
      .subscribe((auth) => {
        this.isAuth = auth;
      });
    fromEvent(document, 'click')
      .pipe(takeUntil(this.destroy$))
      .subscribe((clickEvent) => {
        const targetId = (clickEvent.target as HTMLElement)?.id;
        if (this.showUserNotification && targetId != 'openNotificationButton') {
          this.showUserNotification = false;
        }
        if (this.showUserMenu && targetId != 'openUserMenuButton') {
          this.showUserMenu = false;
        }
      });
  }

  showMobileMenu() {
    this.show = !this.show;
  }
  openUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }
  openUserNotification() {
    this.showUserNotification = !this.showUserNotification;
    if (this.showUserNotification) {
      this.notificationService.notificationSeen();
    }
  } 
  logout() {
    this.authService
      .signout()
      .pipe(take(1))
      .subscribe(() => {
        this.authService.setAuthUser(null);
        this.notificationService.closeEventSource()
        this.router.navigateByUrl('auth');
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
  onLanguageChange(newLanguage: string) {
    this.translate.onLanguageChange(newLanguage);
  }
}
