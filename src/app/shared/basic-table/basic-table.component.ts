import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserStatusPipe } from '../../user-status.pipe';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-basic-table',
  standalone: true,
  imports: [CommonModule, UserStatusPipe, MatPaginatorModule],
  templateUrl: './basic-table.component.html',
  styleUrl: './basic-table.component.css',
})
export class BasicTableComponent {
  @Input() deletable = false;
  @Input() addable = true;
  @Input() columns!: any[];
  @Input() data!: any[];

  @Output() add = new EventEmitter();
  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();
  pageSize = 10;
  page = 0;
  pageSizeOptions = [4, 7, 10, 20, 25];

  handlePageEvent(e: PageEvent) {
    this.page = e.pageIndex;
    this.pageSize = e.pageSize;
  }

  ngOnInit(): void {}

  onAdd() {
    this.add.emit();
  }
  onEdit(item: any) {
    this.edit.emit(item);
  }
  onDelete(item: any) {
    this.delete.emit(item);
  }
}
