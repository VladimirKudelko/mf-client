import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { LoaderState } from '../models';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loader$ = new BehaviorSubject<LoaderState>({ show: false });
  public loaderState$ = this.loader$.asObservable();

  show() {
    this.loader$.next(<LoaderState>{ show: true });
  }
  hide() {
    this.loader$.next(<LoaderState>{ show: false });
  }
}
