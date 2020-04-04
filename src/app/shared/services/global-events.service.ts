import { Injectable } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalEventsService {
  documentClick: Observable<any>;
  browserResize: Observable<any>;

  constructor() {
    this.documentClick = fromEvent<any>(document, 'click');
    this.browserResize = fromEvent<any>(window, 'resize');
  }
}
