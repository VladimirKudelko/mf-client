import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { filter } from 'rxjs/operators';

import { AuthService } from 'src/app/shared/services/auth.service';
import { RoleEnum, PopupEnum } from 'src/app/shared/enums';
import { NotificationModalComponent, RecoveryPasswordModalComponent } from 'src/app/shared/components/modals';
import { SidebarService } from 'src/app/shared/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _dialog: MatDialog,
    private _authService: AuthService,
    private _sidebarService: SidebarService
  ) {
    this.loginForm = this._fb.group({
      'email': [
        '',
        Validators.compose([
          Validators.required,
          Validators.email
        ])
      ],
      'password': [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(25)
        ])
      ]
    });
  }

  ngOnInit(): void {
    this._sidebarService.hide();
  }

  public isControlInvalid(controlName: string): boolean {
    return (
      this.loginForm.controls[controlName].invalid &&
      this.loginForm.controls[controlName].touched
    );
  }

  public submit(): void {
    this._authService.loginUser(this.loginForm.value)
      .subscribe(
        response => {
          this._authService.saveToLocalStorage('token', response.token);
          this._authService.getRole() === RoleEnum.Admin
            ? this._router.navigateByUrl('/admin')
            : this._router.navigateByUrl('/dashboard');
        },
        response => {
          if (!response.error || !response.error.message) {
            return;
          }

          this._dialog.open(NotificationModalComponent, {
            width: '400px',
            data: {
              modalType: PopupEnum.Error,
              message: response.error.message
            }
          });
        }
      );
  }

  public openRecoveryPasswordModal(): void {
    this._dialog
      .open(RecoveryPasswordModalComponent, { minWidth: '50vw', minHeight: '25vh' })
      .afterClosed()
      .pipe(filter(result => !!result))
      .subscribe(result => {
        const { userId, newPassword } = result;

        this._authService.resetPassword(userId, newPassword).subscribe(isSuccessfully => {
          const popupStatus = isSuccessfully
            ? PopupEnum.Success
            : PopupEnum.Error;
          const popupMessage = isSuccessfully
            ? 'Password has been updated'
            : 'Password has not been updated';

          this.showNotification(popupStatus, popupMessage);
        });
      });
  }

  private showNotification(modalType: PopupEnum, message: string): void {
    this._dialog.open(NotificationModalComponent, {
      width: '400px',
      data: { modalType, message }
    });
  }
}
