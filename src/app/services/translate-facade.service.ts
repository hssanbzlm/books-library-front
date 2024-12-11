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
  $currentLanguage = new BehaviorSubject<any>({
    value: 'en',
    flag: 'assets/flags/uk.png',
  });
  languages = [
    { value: 'ar', viewValue: 'العربية', flag: 'assets/flags/tunisia.png' },
    { value: 'fr', viewValue: 'Français', flag: 'assets/flags/france.png' },
    { value: 'en', viewValue: 'English', flag: 'assets/flags/uk.png' },
  ];
  constructor(private translate: TranslateService) {
    super();
    this.setup();
  }
  private setCurrentLanguage() {
    const currentLanguage = localStorage.getItem('borrow-language') || 'en';
    this.translate.use(currentLanguage);
    const currentFlag = this.languages.find(
      (language) => language.value == currentLanguage
    )!.flag;
    this.$currentLanguage.next({ value: currentLanguage, flag: currentFlag });
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
      const currentFlag = this.languages.find(
        (language) => language.value == languageEvent.lang
      )?.flag;
      this.$currentLanguage.next({
        value: languageEvent.lang,
        flag: currentFlag,
      });
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
