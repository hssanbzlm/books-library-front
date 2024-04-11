import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { IUser } from '../../interfaces/IUser';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css',
})
export class BookDetailsComponent {
  show = false;
  isAuth!: IUser | null;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    const bookId = this.route.snapshot.paramMap.get('id');
    this.authService.getAuthListener().subscribe((v) => {
      this.isAuth = v;
    });
  }

  onBorrow() {
    if (this.isAuth) this.showModal();
    else this.router.navigateByUrl('auth');
  }

  showModal() {
    this.show = !this.show;
  }
}
