import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { LanguageEnum } from '../enums';
import { getUserLanguage } from '../../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {
  set currentLanguage(language: string) {
    this._translateService.use(language);
    this._translateService.currentLang = language;
  }

  get currentLanguage(): string {
    return this._translateService.currentLang;
  }

  constructor(private _translateService: TranslateService) {}

  initialize() {
    this._translateService.setDefaultLang(LanguageEnum.English);
    this.currentLanguage = getUserLanguage();
  }

  getInstantTranslation(key: string, args?: Object): string {
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

    // TODO: refactor this loop
    // tslint:disable-next-line:forin
    for (const arg in args) {
      translate = translate.replace(`{{${arg}}}`, args[arg]);
    }

    return translate;
  }

}
