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

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, MatBadgeModule, NotSeenNotifPipe],
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
  private destroy$ = new Subject();

  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
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
