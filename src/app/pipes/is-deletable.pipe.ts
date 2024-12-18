import { Pipe, PipeTransform } from '@angular/core';
import { AuthService } from '@src/services/auth.service';

@Pipe({
  name: 'isDeletable',
  standalone: true,
})
export class IsDeletablePipe implements PipeTransform {
  constructor(private authService: AuthService) {}

  transform(value: any): unknown {
    return (
      (!('status' in value) && this.authService.getAuthUser()?.admin) ||
      ('status' in value &&
        value.status == 'Pending' &&
        !this.authService.getAuthUser()?.admin)
    );
  }
}
