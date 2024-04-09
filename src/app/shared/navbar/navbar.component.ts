import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { IUser } from '../../interfaces/IUser';

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
  isAuth!: IUser | null;
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.authService.getAuthListener().subscribe((v) => {
      this.isAuth = v;
    });
  }
  showMobileMenu() {
    this.show = !this.show;
  }

  logout() {
    this.authService.signout().subscribe(() => {
      this.authService.setAuthUser(null);
      this.router.navigateByUrl('auth');
    });
  }
}
