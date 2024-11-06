import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserStatusPipe } from '../../user-status.pipe';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import {
  TranslatePipe,
  TranslateDirective,
  TranslateService,
  LangChangeEvent,
} from '@ngx-translate/core';

@Component({
  selector: 'app-basic-table',
  standalone: true,
  imports: [
    CommonModule,
    UserStatusPipe,
    MatPaginatorModule,
    TranslatePipe,
    TranslateDirective,
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
  currentLanguage!: string;
  langDir = 'ltr';
  constructor(private translate: TranslateService) {}

  handlePageEvent(e: PageEvent) {
    this.page = e.pageIndex;
    this.pageSize = e.pageSize;
  }

  ngOnInit(): void {
    if (this.translate.currentLang == 'ar') this.langDir = 'rtl';
    else this.langDir = 'ltr';
    this.translate.onLangChange.subscribe((languageEvent: LangChangeEvent) => {
      if (languageEvent.lang == 'ar') this.langDir = 'rtl';
      else this.langDir = 'ltr';
    });
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
}
