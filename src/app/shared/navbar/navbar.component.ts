import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { IUser } from '../../interfaces/IUser';
import { fromEvent, ReplaySubject, Subject, take, takeUntil } from 'rxjs';
import { NotificationService } from '../../services/notification.service';
import { IBorrow } from '../../interfaces/IBorrow';
import { MatBadgeModule } from '@angular/material/badge';
import { NotSeenNotifPipe } from '../../not-seen-notif.pipe';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import {
  MatSelect,
  MatFormField,
  MatLabel,
  MatOption,
} from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  imports: [
    CommonModule,
    RouterLink,
    MatBadgeModule,
    NotSeenNotifPipe,
    TranslatePipe,
    MatSelect,
    MatFormField,
    MatLabel,
    MatOption,
    FormsModule,
  ],
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  @Input() navItems: { title: string; path: string }[] = [];
  show = false;
  showUserMenu = false;
  showUserNotification = false;
  isAuth!: IUser | null;
  notifications$!: ReplaySubject<IBorrow[]>;
  languages = [
    { value: 'ar', viewValue: 'Arabic' },
    { value: 'fr', viewValue: 'French' },
    { value: 'en', viewValue: 'English' },
  ];
  selectedLanguage = localStorage.getItem('borrow-language') ?? 'en';
  private destroy$ = new Subject();

  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService,
    private translate: TranslateService
  ) {}
  ngOnInit(): void {
    this.notifications$ = this.notificationService.getNotificationsStream();
    this.authService
      .getAuthListener()
      .pipe(takeUntil(this.destroy$))
      .subscribe((v) => {
        this.isAuth = v;
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
  onLanguageChange(newLanguage: string) {
    this.translate.use(newLanguage);
    localStorage.setItem('borrow-language', newLanguage);
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
        this.router.navigateByUrl('auth');
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.notificationService.closeEventSource();
  }
}
