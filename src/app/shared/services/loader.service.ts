import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { LoaderState } from '../models';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loader$ = new Subject<LoaderState>();
  public loaderState$ = this.loader$.asObservable();

  show() {
    this.loader$.next(<LoaderState>{ show: true });
  }
  hide() {
    this.loader$.next(<LoaderState>{ show: false });
  }
}
