import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink],
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  @Input() navItems: { title: string; path: string }[] = [];
  show = false;
  constructor(private authService: AuthService, private router: Router) {}
  showMobileMenu() {
    this.show = !this.show;
  }

  logout() {
    this.authService.signout().subscribe(() => {
      this.router.navigateByUrl('auth');
    });
  }
}
