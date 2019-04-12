import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

import { environment } from 'src/environments/environment';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = localStorage.getItem('token');
    let modified = request.clone({
      url: environment.apiUrl + request.url
    });

    if (!_.isEmpty(token)) {
      modified = modified.clone({
        headers: request.headers.set('Authorization', token)
      });
    }

    return next.handle(modified);
  }
}
