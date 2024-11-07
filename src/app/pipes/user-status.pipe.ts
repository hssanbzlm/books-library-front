import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userStatus',
  standalone: true,
})
export class UserStatusPipe implements PipeTransform {
  transform(value: boolean, ...args: unknown[]): 'Active' | 'Inactive' {
    if (value) return 'Active';
    return 'Inactive';
  }
}
