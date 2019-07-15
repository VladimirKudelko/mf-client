import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { LoaderState } from '../models';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private _loader$ = new BehaviorSubject<LoaderState>({ isShow: false });
  public loaderState$ = this._loader$.asObservable();

  public show(): void {
    this._loader$.next(<LoaderState>{ isShow: true });
  }

  public hide(): void {
    this._loader$.next(<LoaderState>{ isShow: false });
  }
}
