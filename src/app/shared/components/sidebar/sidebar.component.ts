import { Component } from '@angular/core';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';

import { NAV_ITEMS } from '../../constants/sidebar-items';
import { AuthService } from '../../services';
import { LanguageEnum } from '../../enums';
import { LocalizationService } from '../../services/localization.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  public navItems = NAV_ITEMS;
  public faDoorOpen = faDoorOpen;
  public LanguageEnum = LanguageEnum;

  constructor(
    private _authService: AuthService,
    private _localizationService: LocalizationService
  ) { }

  public logout(): void {
    this._authService.logout();
  }

  changeLanguage(language: LanguageEnum): void {
    if (!language || language === this._localizationService.currentLanguage) {
      return;
    }

    this._localizationService.currentLanguage = language;
  }
}
