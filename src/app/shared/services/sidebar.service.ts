import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { SidebarState } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private sidebar$ = new BehaviorSubject<SidebarState>({ show: false });
  public sidebarState$ = this.sidebar$.asObservable();

  public show(): void {
    this.sidebar$.next(<SidebarState>{ show: true });
  }

  public hide(): void {
    this.sidebar$.next(<SidebarState>{ show: false });
  }
}
