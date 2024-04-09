import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent {
  readonly userEmail = '';
  readonly userPassword = '';
  submitted = false;
  errorMessage = '';
  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.submitted = true;
    this.errorMessage = '';
    this.authService.signin(this.userEmail, this.userPassword).subscribe({
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
