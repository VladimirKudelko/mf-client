import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import * as _ from 'lodash';
import * as httpStatus from 'http-status-codes';

import { environment } from 'src/environments/environment';
import { NotificationModalComponent } from '../components/modals';
import { PopupEnum } from '../enums';
import { LocalizationService } from '../services/localization.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(
    private _localizationService: LocalizationService,
    private _router: Router,
    private _dialog: MatDialog,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    let modified = request.url.includes('assets')
      ? request.clone({ url: `${environment.clientUrl}${request.url}` })
      : request.clone({ url: `${environment.apiUrl}${request.url}` });

    if (!_.isEmpty(token)) {
      modified = modified.clone({
        headers: request.headers.set('Authorization', token)
      });
    }

    return next.handle(modified).pipe(
      tap(
        (event: HttpEvent<any>) => {},
        (error) => {
          switch (error.status) {
            case httpStatus.UNAUTHORIZED:
              this._router.navigate(['/auth/login']);

              break;
            case 0:
              this.showNotification(
                PopupEnum.Error,
                `
                  ${this._localizationService.getTranslation('Sorry, but the service is not available now')}.\
                  ${this._localizationService.getTranslation('Try to do it later')}.\
                `
              );
              this._router.navigate(['/auth/login']);

              break;
          }
        }
      )
    );
  }

  private showNotification(modalType: PopupEnum, message: string): void {
    this._dialog.open(NotificationModalComponent, {
      width: '400px',
      data: { modalType, message }
    });
  }
}
