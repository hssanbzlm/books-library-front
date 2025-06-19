import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '@src/services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subject, take, takeUntil } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageDirection } from '@src/common/types';
import { TranslateFacadeService } from '@src/services/translate-facade.service';
import { AppStateShape } from '@src/store';
import { Store } from '@ngrx/store';
import * as BorrowActionsTypes from '@src/store/borrow/borrow.actions';
import * as UserActionsTypes from '@src/store/user/users.actions';
import { NotificationService } from '@src/services/notification.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule, TranslatePipe],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent {
  readonly userEmail = '';
  readonly userPassword = '';
  submitted = false;
  errorMessage = '';
  pageDirection!: LanguageDirection;
  $destroy = new Subject();

  constructor(
    private authService: AuthService,
    private notificationService:NotificationService,
    private router: Router,
    private translate: TranslateFacadeService,
    private store: Store<{ appState: AppStateShape }>
  ) {}
  ngOnInit(): void {
    this.translate
      .getPageDirection()
      .pipe(takeUntil(this.$destroy))
      .subscribe((pageDirection) => {
        this.pageDirection = pageDirection;
      });
  }

  onSubmit() {
    this.submitted = true;
    this.errorMessage = '';
    this.authService
      .signin(this.userEmail, this.userPassword)
      .pipe(take(1))
      .subscribe({
        next: ({data}) => {
          this.authService.setAuthUser(data!.login);
          this.notificationService.initSseEventSource(data!.login)
          this.notificationService.getNotifications()
          this.store.dispatch(BorrowActionsTypes.init());
          if (data?.login.admin) {
            this.store.dispatch(UserActionsTypes.init());
            this.router.navigateByUrl('admin');
          } else {
            const redirectUrl = this.authService.getRedirectUrl();
            if (redirectUrl) {
              this.router.navigateByUrl(redirectUrl);
              this.authService.setRedirectUrl('');
            } else this.router.navigateByUrl('user');
          }
        },
        error: (error) => {
          this.errorMessage = 'Please verify your credentials';
        },
      });
  }
  ngOnDestroy(): void {
    this.$destroy.next(true);
  }
}
