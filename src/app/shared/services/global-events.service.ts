import { Injectable } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalEventsService {
  browserResize: Observable<any>;

  constructor() {
    this.browserResize = fromEvent<any>(window, 'resize');
  }
}
