import { Component, ElementRef } from '@angular/core';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';

import { NAV_ITEMS } from '../../constants/sidebar-items';
import { AuthService } from '../../services';
import { LanguageEnum } from '../../enums';
import { LocalizationService } from '../../services';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  public navItems = NAV_ITEMS;
  public faDoorOpen = faDoorOpen;
  public LanguageEnum = LanguageEnum;
  public isHide = false;
  public arrowIconPath = '../../../../assets/back.svg';

  constructor(
    private _authService: AuthService,
    private _localizationService: LocalizationService,
    private _hostElementRef: ElementRef
  ) {}

  public logout(): void {
    this._authService.logout();
  }

  public changeLanguage(language: LanguageEnum): void {
    if (!language || language === this._localizationService.currentLanguage) {
      return;
    }

    this._localizationService.currentLanguage = language;
  }

  public toggleSidebar(): void {
    this.isHide = !this.isHide;
    this._hostElementRef.nativeElement.style.marginLeft = this.isHide ? '-350px' : 0;
    this.arrowIconPath = this.isHide
      ? '../../../../assets/next.svg'
      : '../../../../assets/back.svg';
  }
}
