import { Injectable } from '@angular/core';

import { Themes } from '../enums';

@Injectable({
  providedIn: 'root'
})
export class UserPreferencesService {
  get currentTheme(): Themes {
    return localStorage.getItem('theme') as Themes || Themes.Light;
  }

  set currentTheme(theme: Themes) {
    const bodyElement = document.querySelector('body');

    if (!bodyElement) {
      return;
    }

    if (theme === Themes.Dark) {
      bodyElement.classList.add(Themes.Dark);
    } else {
      bodyElement.classList.remove(Themes.Dark);
    }
  }

  public changeTheme(theme: Themes): void {
    this.currentTheme = theme;
  }
}
