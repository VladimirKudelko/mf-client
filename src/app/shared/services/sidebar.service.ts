import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { SidebarState } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private sidebar$ = new BehaviorSubject<SidebarState>({ show: false });
  public sidebarState$ = this.sidebar$.asObservable();

  show() {
    this.sidebar$.next(<SidebarState>{ show: true });
  }
  hide() {
    this.sidebar$.next(<SidebarState>{ show: false });
  }
}
