import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IBook } from '../../interfaces/IBook';
import { AuthService } from '../../services/auth.service';
import { IUser } from '../../interfaces/IUser';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.css',
})
export class BookComponent {
  @Input() book?: IBook;
  show = false;
  isAuth!: IUser | null;

  constructor(private router: Router, private authservice: AuthService) {}
  ngOnInit(): void {
    this.authservice.getAuthListener().subscribe((v) => {
      this.isAuth = v;
    });
  }
  toBookDetails() {
    this.router.navigate(['user', 'book', 1]);
  }
  borrow(event: Event) {
    if (this.isAuth) this.showModal(event);
    else this.router.navigateByUrl('auth');
  }

  showModal(event?: Event) {
    event?.stopPropagation();
    this.show = !this.show;
  }
}
