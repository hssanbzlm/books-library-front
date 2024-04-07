import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SigninComponent } from './shared/signin/signin.component';
import { UserModule } from './user/user.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SigninComponent, RouterModule, UserModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'books-library';
}
