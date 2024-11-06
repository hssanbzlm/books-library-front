import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { take } from 'rxjs';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

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
  pageDirection = 'ltr';

  constructor(
    private authService: AuthService,
    private router: Router,
    private translate: TranslateService
  ) {}
  ngOnInit(): void {
    this.pageDirection = this.translate.currentLang == 'ar' ? 'rtl' : 'ltr';
  }

  onSubmit() {
    this.submitted = true;
    this.errorMessage = '';
    this.authService
      .signin(this.userEmail, this.userPassword)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.authService.setAuthUser(response);
          if (response.admin) this.router.navigateByUrl('admin');
          else this.router.navigateByUrl('user');
        },
        error: (error) => {
          this.errorMessage = 'Please verify your credentials';
        },
      });
  }
}
