import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SigninComponent } from './shared/signin/signin.component';
import { UserModule } from './user/user.module';
import { authGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SigninComponent, RouterModule, UserModule],
  providers: [AuthService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'books-library';
}
