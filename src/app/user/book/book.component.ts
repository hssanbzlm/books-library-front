import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IBook } from '../../interfaces/IBook';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.css',
})
export class BookComponent {
  @Input() book?: IBook;
  show = false;

  constructor(private router: Router) {}
  toBookDetails() {
    this.router.navigate(['user', 'book', 1]);
  }
  borrow(event: Event) {
    this.showModal(event);
  }

  showModal(event?: Event) {
    event?.stopPropagation();
    this.show = !this.show;
  }
}
