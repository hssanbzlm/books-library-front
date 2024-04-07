import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-basic-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './basic-table.component.html',
  styleUrl: './basic-table.component.css',
})
export class BasicTableComponent {
  @Input() columns!: any[];
  @Input() data!: any[];

  @Output() add = new EventEmitter();
  @Output() edit = new EventEmitter();

  ngOnInit(): void {}

  onAdd() {
    this.add.emit();
  }
  onEdit(item: any) {
    this.edit.emit(item);
  }
}
