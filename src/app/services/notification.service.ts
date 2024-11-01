import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { IUser } from '../interfaces/IUser';
import {
  missedNotificationUrl,
  notificationEventSourceUrl,
  notificationsSeenUrl,
} from '../../API/api';
import { HttpClient } from '@angular/common/http';
import { IBorrow } from '../interfaces/IBorrow';
import { Observable, ReplaySubject, Subject, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  eventSource!: EventSource;
  notifications: IBorrow[] = [];
  notifications$ = new ReplaySubject<IBorrow[]>();

  constructor(private authService: AuthService, private http: HttpClient) {
    this.authService.getAuthListener().subscribe((user: IUser | null) => {
      if (user) {
        this.initSseEventSource(user);
        this.getNotifications();
      }
    });
  }

  initSseEventSource(user: IUser) {
    const roleReceiver = user.admin ? 'admin-notif' : 'user-notif';
    this.eventSource = new EventSource(
      `${notificationEventSourceUrl}/${roleReceiver}/${user.id}`
    );
    this.eventSource.onmessage = ({ data }) => {
      if (data) {
        const borrowData: IBorrow = JSON.parse(data);
        const notifIndex = this.notifications.findIndex(
          (notification) => notification.userToBookId == borrowData.userToBookId
        );
        if (notifIndex >= 0) {
          this.notifications[notifIndex] = borrowData;
        } else {
          this.notifications.push(borrowData);
        }
        this.notifications$.next(this.notifications);
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
      .get<IBorrow[]>(missedNotificationUrl, { withCredentials: true })
      .subscribe((notifications: IBorrow[]) => {
        this.notifications.push(...notifications);
        this.notifications$.next(notifications);
      });
  }
  getNotificationsStream() {
    return this.notifications$;
  }
  notificationSeen() {
    if (this.notifications.filter((notif) => !notif.receiverSeen).length > 0) {
      this.http
        .put(
          notificationsSeenUrl,
          {
            notifications: this.notifications.map(
              (userToBook) => userToBook.userToBookId
            ),
          },
          { withCredentials: true }
        )
        .subscribe({
          next: () => {
            this.notifications = this.notifications.map((userToBook) => ({
              ...userToBook,
              receiverSeen: true,
            }));
            this.notifications$.next(this.notifications);
          },
          error: (error) => {
            console.log('error ', error);
          },
        });
    }
    return null;
  }
}
