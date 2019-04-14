import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as _ from 'lodash';
import * as httpStatus from 'http-status-codes';

import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(
    private _router: Router
  ) { }

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

    return next.handle(modified).pipe(
      tap(
        (event: HttpEvent<any>) => { },
        (error: any) => {
          if (error.status === httpStatus.UNAUTHORIZED) {
            this._router.navigate(['/auth/login']);
          }
        }
      )
    );
  }
}
