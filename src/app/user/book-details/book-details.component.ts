import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css',
})
export class BookDetailsComponent {
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    const bookId = this.route.snapshot.paramMap.get('id');
  }
}
