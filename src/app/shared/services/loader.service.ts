import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { LoaderState } from '../models';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loader$ = new BehaviorSubject<LoaderState>({ show: false });
  public loaderState$ = this.loader$.asObservable();

  public show(): void {
    this.loader$.next(<LoaderState>{ show: true });
  }

  public hide(): void {
    this.loader$.next(<LoaderState>{ show: false });
  }
}
