import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IBook } from '../../interfaces/IBook';

@Component({
  selector: 'app-delete-book',

  templateUrl: './delete-book.component.html',
  styleUrl: './delete-book.component.css',
})
export class DeleteBookComponent {
  deleting = false;
  @Input() book!: IBook;
  @Output() delete = new EventEmitter();
  constructor() {}

  onDelete() {
    this.deleting = true;
    setTimeout(() => {
      this.delete.emit();
    }, 5000);
  }
}
