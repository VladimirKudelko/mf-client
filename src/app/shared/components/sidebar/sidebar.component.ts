import { Component } from '@angular/core';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';

import { NAV_ITEMS } from '../../constants/sidebar-items';
import { AuthService } from '../../services';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  public navItems = NAV_ITEMS;
  public faDoorOpen = faDoorOpen;

  constructor(
    private _authService: AuthService
  ) { }

  public logout(): void {
    this._authService.logout();
  }
}
