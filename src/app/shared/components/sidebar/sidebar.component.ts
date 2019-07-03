import { Component } from '@angular/core';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';

import { navItems } from '../../constants/sidebar-items';
import { AuthService } from '../../services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  public navItems = navItems;
  public faDoorOpen = faDoorOpen;

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) { }

  public logout(): void {
    this._authService.logout().subscribe(response => {
      const { userId } = response;

      if (!userId) {
        return;
      }

      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this._router.navigateByUrl('/auth/login');
    });
  }
}
