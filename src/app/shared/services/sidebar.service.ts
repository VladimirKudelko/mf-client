import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { SidebarState } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private _sidebar$ = new BehaviorSubject<SidebarState>({ isShow: false });
  public sidebarState$ = this._sidebar$.asObservable();

  public show(): void {
    this._sidebar$.next(<SidebarState>{ isShow: true });
  }

  public hide(): void {
    this._sidebar$.next(<SidebarState>{ isShow: false });
  }
}
