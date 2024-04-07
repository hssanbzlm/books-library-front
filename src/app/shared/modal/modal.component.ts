import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  @Output() dismiss = new EventEmitter();

  sendDismiss(e: Event) {
    e.stopPropagation();
    this.dismiss.emit('dismiss');
  }
  clickModal(e: Event) {
    e.stopPropagation();
  }
}
