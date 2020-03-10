import { Injectable } from '@angular/core';

import { Themes } from '../enums';

@Injectable({
  providedIn: 'root'
})
export class UserPreferencesService {
  private theme: Themes;

  get currentTheme(): Themes {
    return this.theme || localStorage.getItem('theme') as Themes || Themes.Light;
  }

  set currentTheme(theme: Themes) {
    const bodyElement = document.querySelector('body');

    if (!bodyElement) {
      return;
    }

    this.theme = theme;

    if (theme === Themes.Dark) {
      bodyElement.classList.add(Themes.Dark);
    } else {
      bodyElement.classList.remove(Themes.Dark);
    }

    localStorage.setItem('theme', theme);
  }

  public changeTheme(theme: Themes): void {
    this.currentTheme = theme;
  }
}
