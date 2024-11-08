import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-full-screen-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './full-screen-loader.component.html',
  styleUrl: './full-screen-loader.component.css',
})
export class FullScreenLoaderComponent {
  @Input() isLoading: boolean = false;

  onClick(event: Event) {
    event.stopPropagation();
  }
}
