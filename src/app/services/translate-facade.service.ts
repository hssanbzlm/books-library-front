import { Injectable } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { LanguageDirection } from '@src/common/types';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslateFacadeService {
  $pageDirection = new BehaviorSubject<LanguageDirection>('ltr');
  $currentLanguage = new BehaviorSubject<string>('en');
  languages = [
    { value: 'ar', viewValue: 'Arabic' },
    { value: 'fr', viewValue: 'French' },
    { value: 'en', viewValue: 'English' },
  ];
  constructor(private translate: TranslateService) {}
  private setCurrentLanguage() {
    const language = localStorage.getItem('borrow-language');
    if (language) this.translate.use(language);
    else this.translate.use('en');
    this.$currentLanguage.next(this.translate.currentLang);
  }
  private setPageDirection() {
    if (this.translate.currentLang == 'ar') this.$pageDirection.next('rtl');
  }
  setup() {
    this.translate.addLangs(['en', 'fr', 'ar']);
    this.translate.setDefaultLang('en');
    this.setCurrentLanguage();
    this.setPageDirection();
    this.translate.onLangChange.subscribe((languageEvent: LangChangeEvent) => {
      this.$currentLanguage.next(languageEvent.lang);
      if (languageEvent.lang == 'ar') this.$pageDirection.next('rtl');
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
