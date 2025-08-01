import { environment } from '../environments/environment';
export const authUrl = `${environment.apiUrl}/auth`;
export const usersUrl = `${environment.apiUrl}/user`;
export const booksUrl = `${environment.apiUrl}/book`;
export const userToBookUrl = `${environment.apiUrl}/user-to-book`;
export const notificationEventSourceUrl = `${environment.apiUrl}/notifications/borrow-notification`;
export const missedNotificationUrl = `${environment.apiUrl}/notifications`;
export const notificationsSeenUrl = `${environment.apiUrl}/notifications/notifications-seen`;
export const isBookReadyToBorrow = `${environment.apiUrl}/user-to-book/is-ready-to-borrow`;
export const updateUserBorrow = `${environment.apiUrl}/user-to-book/update-user-borrow`;
export const cancelUserBorrow = `${environment.apiUrl}/user-to-book/cancel-user-borrow`;
export const recommendBooks = `${environment.apiUrl}/book/recommend`
