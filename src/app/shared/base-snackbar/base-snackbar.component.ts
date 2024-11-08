import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-base-snackbar',
  standalone: true,
  templateUrl: './base-snackbar.component.html',
  styleUrl: './base-snackbar.component.css',
})
export class BaseSnackbarComponent {
  private _snackBar = inject(MatSnackBar);

  @Input({ required: true }) message!: string;
  @Input() open = false;
  @Input() duration = 3000;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['open'] && this.open) {
      this._snackBar.open(this.message, '', { duration: this.duration });
    }
  }
}
