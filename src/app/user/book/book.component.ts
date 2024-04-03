import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.css',
})
export class BookComponent {
  constructor(private router: Router) {}
  toBookDetails() {
    this.router.navigate(['user', 'book', 1]);
  }
}
