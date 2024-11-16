import { Pipe, PipeTransform } from '@angular/core';
import { AuthService } from '@src/services/auth.service';
import { NotAllowedEditStatus } from '@src/common/types';

@Pipe({
  name: 'isEditable',
  standalone: true,
})
export class IsEditablePipe implements PipeTransform {
  constructor(private authService: AuthService) {}

  transform(value: any): unknown {
    const notAllowedEditStatus: NotAllowedEditStatus[] = [
      'Canceled',
      'Damaged',
      'Refused',
      'Returned',
    ];

    return (
      !('status' in value) ||
      (value.status == 'Pending' && !this.authService.getAuthUser()?.admin) ||
      (this.authService.getAuthUser()?.admin &&
        !notAllowedEditStatus.includes(value.status))
    );
  }
}
