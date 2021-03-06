import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import * as moment from 'moment';

import { LanguageEnum } from '../enums';
import { getUserLanguage } from '../../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {
  private availableLanguages: LanguageEnum[] = [LanguageEnum.English, LanguageEnum.Russian];

  set currentLanguage(language: string) {
    this._translateService.use(language);
    this._translateService.currentLang = language;

    this.setMomentLocale(language);

    localStorage.setItem('language', language);
  }

  get currentLanguage(): string {
    return this._translateService.currentLang;
  }

  constructor(private _translateService: TranslateService) {}

  initialize() {
    this._translateService.setDefaultLang(LanguageEnum.English);
    this.currentLanguage = localStorage.getItem('language') || getUserLanguage();
  }

  getTranslation(key: string, args?: Object): string {
    if (!key) {
      return '';
    }

    let translate;

    try {
      translate = this._translateService.instant(key);
    } catch {
      return key;
    }

    if (!args) {
      return translate;
    }

    // tslint:disable-next-line:forin
    for (const arg in args) {
      translate = translate.replace(`{{${arg}}}`, args[arg]);
    }

    return translate;
  }

  private setMomentLocale(language: string): void {
    if (!this.availableLanguages.includes(language as LanguageEnum)) {
      moment.locale(LanguageEnum.English);

      return;
    }

    moment.locale(language);
  }
}
