import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { UserStatusPipe } from '@src/pipes/user-status.pipe';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { TranslatePipe } from '@ngx-translate/core';
import { TranslateFacadeService } from '@src/services/translate-facade.service';
import { LanguageDirection } from '@src/common/types';
import { MatSortModule, Sort } from '@angular/material/sort';
import { compare } from '@src/common/helper';

@Component({
  selector: 'app-basic-table',
  standalone: true,
  imports: [
    CommonModule,
    UserStatusPipe,
    MatPaginatorModule,
    TranslatePipe,
    MatSortModule,
  ],
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
  languages = this.translate.getLanguages();
  currentLanguage!: string;
  pageDirection!: LanguageDirection;
  sortedData!: any[];

  constructor(private translate: TranslateFacadeService) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      this.sortedData = [...this.data];
    }
  }
  ngOnInit(): void {
    this.translate.getCurrentLanguage().subscribe((currentLanguage) => {
      this.currentLanguage = currentLanguage;
    });
    this.translate.getPageDirection().subscribe((pageDirection) => {
      this.pageDirection = pageDirection;
    });
  }
  setDirectionClass() {
    return this.translate.getDirectionClass();
  }

  handlePageEvent(e: PageEvent) {
    this.page = e.pageIndex;
    this.pageSize = e.pageSize;
  }

  onAdd() {
    this.add.emit();
  }
  onEdit(item: any) {
    this.edit.emit(item);
  }
  onDelete(item: any) {
    this.delete.emit(item);
  }
  sortData(sort: Sort) {
    if (!sort.active || sort.direction === '') {
      this.sortedData = [...this.data];
      return;
    }
    this.sortedData.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      return compare(a[sort.active], b[sort.active], isAsc);
    });
  }
}
