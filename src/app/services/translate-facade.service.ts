import { Injectable } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { LanguageDirection } from '@src/common/types';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslateFacadeService extends MatPaginatorIntl {
  $pageDirection = new BehaviorSubject<LanguageDirection>('ltr');
  $currentLanguage = new BehaviorSubject<string>('en');
  languages = [
    { value: 'ar', viewValue: 'Arabic' },
    { value: 'fr', viewValue: 'French' },
    { value: 'en', viewValue: 'English' },
  ];
  constructor(private translate: TranslateService) {
    super();
    this.setup();
  }
  private setCurrentLanguage() {
    const language = localStorage.getItem('borrow-language') || 'en';
    this.translate.use(language);
    this.$currentLanguage.next(language);
  }
  private setPageDirection() {
    if (this.translate.currentLang == 'ar') this.$pageDirection.next('rtl');
    else this.$pageDirection.next('ltr');
  }
  private setPaginatorLang() {
    this.itemsPerPageLabel = this.translate.instant('paginator.items-per-page');
    this.nextPageLabel = this.translate.instant('paginator.next');
    this.previousPageLabel = this.translate.instant('paginator.previous');
  }
  setup() {
    this.translate.addLangs(['en', 'fr', 'ar']);
    this.setCurrentLanguage();
    this.setPageDirection();
    this.setPaginatorLang();

    this.translate.onLangChange.subscribe((languageEvent: LangChangeEvent) => {
      this.$currentLanguage.next(languageEvent.lang);
      if (languageEvent.lang == 'ar') this.$pageDirection.next('rtl');
      else this.$pageDirection.next('ltr');
      this.setPaginatorLang();
      this.changes.next();
    });
  }

  getDirectionClass() {
    return this.translate.currentLang == 'ar' ? 'text-right' : 'text-left';
  }
  getLanguages() {
    return this.languages;
  }
  getPageDirection() {
    return this.$pageDirection.asObservable();
  }
  getCurrentLanguage() {
    return this.$currentLanguage.asObservable();
  }
  onLanguageChange(newLanguage: string) {
    this.translate.use(newLanguage);
    localStorage.setItem('borrow-language', newLanguage);
  }
}
