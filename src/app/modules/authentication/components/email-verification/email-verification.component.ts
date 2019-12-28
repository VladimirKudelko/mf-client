import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NotificationModalComponent } from 'src/app/shared/components/modals';
import { PopupEnum } from 'src/app/shared/enums';
import { AuthService } from 'src/app/shared/services';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject();

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _dialog: MatDialog,
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    this.registerParseParamsListener();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private registerParseParamsListener(): void {
    this._route.queryParams
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(params => {
        if (!params || !params.email || !params.hash) {
          this.showNotification(PopupEnum.Error, 'There is no necessary data to activate your email');

          return;
        }

        this.verifyEmail(params.email, params.hash);
      });
  }

  private verifyEmail(email: string, hash: string): void {
    this._authService.verifyEmail(email, hash).subscribe(
      () => {
        this.showNotification(PopupEnum.Success, 'Your account has been successfully activated');
        this.navigateToHome();
      },
      response => {
        this.showNotification(PopupEnum.Error, response.error.message);
        this.navigateToHome();
      }
    );
  }

  private showNotification(modalType: PopupEnum, message: string): void {
    this._dialog.open(NotificationModalComponent, {
      width: '400px',
      data: { modalType, message }
    });
  }

  private navigateToHome(): void {
    setTimeout(() => {
      this._router.navigate(['/dashboard/home']);
      this._dialog.closeAll();
    }, 2500);
  }
}
