import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dynamic-button',
  templateUrl: './dynamic-button.component.html',
  styleUrl: './dynamic-button.component.css',
})
export class DynamicButtonComponent {
  @Input() isWaiting!: boolean | null;
  @Input() isDisabled!: boolean;
  @Input() label!: string;
  @Input() classes?: string;
  @Input() waitingLabel!: string;
  @Output() clicked = new EventEmitter();
  constructor() {}
  onClick() {
    this.clicked.emit();
  }
}
