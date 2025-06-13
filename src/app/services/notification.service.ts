import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { INotification, IUser } from '@src/common/types';
import {
  missedNotificationUrl,
  notificationEventSourceUrl,
  notificationsSeenUrl,
} from '@api/api';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  eventSource!: EventSource;
  notifications$ = new BehaviorSubject<INotification[]>([]);

  constructor(private authService: AuthService, private http: HttpClient) {
    this.authService
      .getAuthListener()
      .pipe(take(1))
      .subscribe((user: IUser | null) => {
        if (user) {
          this.initSseEventSource(user);
          this.getNotifications();
        }
      });
  }

  initSseEventSource(user: IUser) {
    const roleReceiver = 'user-notif';
    this.eventSource = new EventSource(
      `${notificationEventSourceUrl}/${roleReceiver}/${user?.id}`
    );
    this.eventSource.onmessage = ({ data }) => {
      if (data) {
        const notification: INotification = JSON.parse(data);
        const notifications = this.notifications$.value;

        notifications.push(notification);

        this.notifications$.next(notifications);
      }
    };
    this.eventSource.onerror = (err) => {
      console.log('error ', err);
    };
  }

  closeEventSource() {
    if (this.eventSource) {
      this.eventSource.close();
    }
  }

  private getNotifications() {
    this.http
      .get<INotification[]>(missedNotificationUrl, { withCredentials: true })
      .pipe(take(1))
      .subscribe((notifications: INotification[]) => {
        this.notifications$.next(notifications);
      });
  }
  getNotificationsStream() {
    return this.notifications$;
  }
  notificationSeen() {
    let notifications = this.notifications$.value;
    if (notifications.filter((notif) => !notif.receiverSeen).length > 0) {
      const notificationsIds = notifications.map(
        (notification) => notification.id
      );
      this.http
        .put(
          notificationsSeenUrl,
          {
            notifications: notificationsIds,
          },
          { withCredentials: true }
        )
        .pipe(take(1))
        .subscribe({
          next: () => {
            notifications = notifications.map((userToBook) => ({
              ...userToBook,
              receiverSeen: true,
            }));
            this.notifications$.next(notifications);
          },
          error: (error) => {
            console.log('error ', error);
          },
        });
    }
    return null;
  }
}
