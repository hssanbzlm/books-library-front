import { Pipe, PipeTransform } from '@angular/core';
import { IBorrow } from './interfaces/IBorrow';

@Pipe({
  name: 'notSeenNotif',
  standalone: true,
  pure: false,
})
export class NotSeenNotifPipe implements PipeTransform {
  transform(value: IBorrow[]) {
    return value.filter((notif) => notif.receiverSeen == false).length;
  }
}
