import { Pipe, PipeTransform } from '@angular/core';
import { IBorrow } from '@src/common/types';

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
